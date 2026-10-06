<#
===============================================================================
 CSCloudSolutions · Azure Value Sprint · Despliegue del sitio de relevamiento
-------------------------------------------------------------------------------
 Publica la carpeta .\site en el static website de Azure Storage:
   https://cscloudfinopsassessment.z13.web.core.windows.net/

 Requisitos: Azure CLI (az) y sesion iniciada en el tenant de CSCloudSolutions
   az login --tenant <TENANT_CSCLOUDSOLUTIONS>
   az account set --subscription <SUSCRIPCION_DONDE_ESTA_LA_CUENTA>

 Uso:
   .\deploy.ps1 -ResourceGroup rg-cscloud-web                          # solo sube archivos
   .\deploy.ps1 -ResourceGroup rg-cscloud-web -CreateAppRegistration   # primera vez: crea la app SPA
   .\deploy.ps1 -ResourceGroup rg-cscloud-web -PartnerId 1234567       # fija el Partner ID en config.js
   .\deploy.ps1 -ResourceGroup rg-cscloud-web -CreateLighthouseGroup   # crea el grupo que recibe la delegacion
   .\deploy.ps1 -ResourceGroup rg-cscloud-web -GuestAccounts 'evaluacion@cscloudsolutions.com.ar','finops@cscloudsolutions.com.ar'
===============================================================================
#>
param(
    [Parameter(Mandatory = $true)][string]$ResourceGroup,
    [string]$StorageAccount = 'cscloudfinopsassessment',
    [switch]$CreateAppRegistration,
    [string]$AppName = 'CSCloudSolutions Azure Value Sprint',
    [string]$PartnerId = '',
    [string]$LighthouseGroupId = '',
    [switch]$CreateLighthouseGroup,
    [string]$LighthouseGroupName = 'CSCloudSolutions - Azure Value Sprint',
    [string[]]$GuestAccounts = @()
)
$ErrorActionPreference = 'Stop'
$site = Join-Path $PSScriptRoot 'site'
$cfg  = Join-Path $site 'config.js'
$utf8 = New-Object System.Text.UTF8Encoding $false

function Set-Cfg([string]$key, [string]$jsValue) {
    $c = [IO.File]::ReadAllText($cfg) -replace "(?m)^(\s*$key\s*:\s*)[^\r\n]*", "`${1}$jsValue,"
    [IO.File]::WriteAllText($cfg, $c, $utf8)
}
function AzCli { $out = & az @args; if ($LASTEXITCODE -ne 0) { throw "Fallo: az $($args -join ' ')" }; return (($out | Out-String).Trim()) }

Write-Host "`n[1/5] Verificando sesion de Azure CLI..." -ForegroundColor Cyan
$acct = AzCli account show -o json | ConvertFrom-Json
Write-Host "   Tenant $($acct.tenantId) - suscripcion $($acct.name)"

Write-Host "`n[2/5] Habilitando static website en $StorageAccount..." -ForegroundColor Cyan
$key = AzCli storage account keys list -g $ResourceGroup -n $StorageAccount --query '[0].value' -o tsv
AzCli storage blob service-properties update --account-name $StorageAccount --account-key $key --static-website --index-document index.html --404-document index.html --only-show-errors | Out-Null
$web = (AzCli storage account show -g $ResourceGroup -n $StorageAccount --query primaryEndpoints.web -o tsv).Trim()
$redirect = $web.TrimEnd('/') + '/redirect.html'
Write-Host "   Sitio: $web"

if ($CreateAppRegistration) {
    Write-Host "`n[3/5] App registration multi-tenant (SPA)..." -ForegroundColor Cyan
    $appId = AzCli ad app list --display-name $AppName --query '[0].appId' -o tsv
    if (-not $appId) {
        $appId = AzCli ad app create --display-name $AppName --sign-in-audience AzureADMultipleOrgs --query appId -o tsv
        Write-Host "   Creada: $appId"
    } else { Write-Host "   Ya existia: $appId" }
    $objId = AzCli ad app show --id $appId --query id -o tsv
    $body = @{
        spa = @{ redirectUris = @($redirect) }
        requiredResourceAccess = @(@{
            resourceAppId  = '797f4846-ba00-4fd7-ba43-dac1f8f63013'   # Azure Service Management
            resourceAccess = @(@{ id = '41094075-9dad-400e-a0bd-54e686782033'; type = 'Scope' })  # user_impersonation
        })
    } | ConvertTo-Json -Depth 6
    $tmp = [IO.Path]::GetTempFileName(); [IO.File]::WriteAllText($tmp, $body, $utf8)
    AzCli rest --method PATCH --url "https://graph.microsoft.com/v1.0/applications/$objId" --headers 'Content-Type=application/json' --body "@$tmp" | Out-Null
    Remove-Item $tmp
    $sp = AzCli ad sp list --filter "appId eq '$appId'" --query '[0].id' -o tsv
    if (-not $sp) { AzCli ad sp create --id $appId | Out-Null }
    Set-Cfg 'spaClientId' "'$appId'"
    Write-Host "   Redirect URI: $redirect"
} else { Write-Host "`n[3/5] App registration: sin cambios (usa -CreateAppRegistration la primera vez)" -ForegroundColor DarkGray }

Write-Host "`n[4/5] Completando config.js..." -ForegroundColor Cyan
Set-Cfg 'ctrl365TenantId' "'$($acct.tenantId)'"
Set-Cfg 'cscloudTenantId' "'$($acct.tenantId)'"
if ($PartnerId) { Set-Cfg 'partnerId' "'$PartnerId'"; Write-Host "   Partner ID: $PartnerId" }
if ($CreateLighthouseGroup -and -not $LighthouseGroupId) {
    $LighthouseGroupId = AzCli ad group list --display-name $LighthouseGroupName --query '[0].id' -o tsv
    if (-not $LighthouseGroupId) {
        $nick = ($LighthouseGroupName -replace '[^A-Za-z0-9]', '').ToLower()
        $LighthouseGroupId = AzCli ad group create --display-name $LighthouseGroupName --mail-nickname $nick --description 'Recibe delegaciones de Azure Lighthouse de solo lectura (Azure Value Sprint)' --query id -o tsv
        $me = AzCli ad signed-in-user show --query id -o tsv
        AzCli ad group member add --group $LighthouseGroupId --member-id $me | Out-Null
        Write-Host "   Grupo creado: $LighthouseGroupName ($LighthouseGroupId), con vos como miembro"
    } else { Write-Host "   Grupo existente: $LighthouseGroupName ($LighthouseGroupId)" }
}
if ($LighthouseGroupId) { Set-Cfg 'lighthouseGroupId' "'$LighthouseGroupId'"; Set-Cfg 'lighthouseGroupName' "'$LighthouseGroupName'" }
if ($GuestAccounts.Count) { Set-Cfg 'guestAccounts' ("[" + (($GuestAccounts | ForEach-Object { "'$_'" }) -join ', ') + "]"); Write-Host "   Invitados: $($GuestAccounts -join ', ')" }

Write-Host "`n[5/5] Subiendo archivos a `$web..." -ForegroundColor Cyan
AzCli storage blob upload-batch --account-name $StorageAccount --account-key $key -d '$web' -s $site --overwrite --content-cache-control 'no-cache' --only-show-errors | Out-Null

$appIdNow = ([regex]::Match([IO.File]::ReadAllText($cfg), "spaClientId:\s*'([^']*)'")).Groups[1].Value
Write-Host "`nListo." -ForegroundColor Green
Write-Host "  Sitio:        $web"
Write-Host "  Redirect URI: $redirect"
Write-Host "  Instrucciones para el cliente: $($web.TrimEnd('/'))/cliente.html"
if ($appIdNow) {
    Write-Host "  App (SPA):    $appIdNow"
    Write-Host "  Consentimiento de administrador del cliente:"
    Write-Host "    https://login.microsoftonline.com/<TENANT_CLIENTE>/adminconsent?client_id=$appIdNow&redirect_uri=$([uri]::EscapeDataString($redirect))"
}
