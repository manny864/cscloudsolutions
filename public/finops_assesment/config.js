/*
  CSCloudSolutions · Azure Value Sprint · configuración del sitio
  Sitio: https://cscloudfinopsassessment.z13.web.core.windows.net/
  Estos valores NO son secretos: cualquiera que abra el sitio puede verlos.
  deploy.ps1 completa automáticamente los que puede.
*/
window.APP_CONFIG = {
  // App registration multi-tenant (SPA) en el tenant de CSCloudSolutions (deploy.ps1 -CreateAppRegistration).
  spaClientId: 'b86c228e-67ff-4f85-8f99-c605d27d74c8',

  // Partner ID de CSCloudSolutions (Microsoft AI Cloud Partner Program) para el Partner Admin Link.
  partnerId: '7111700',

  // Tenant de CSCloudSolutions y grupo de seguridad que recibe la delegación de Lighthouse.
  cscloudTenantId: '81ebe027-e6af-4e09-bc73-58c9012c6408',
  ctrl365TenantId: '81ebe027-e6af-4e09-bc73-58c9012c6408', // Compatibilidad retroactiva con scripts de despliegue
  lighthouseGroupId: 'c94cb2f1-0d3d-454e-a470-4e1ec2906996',
  lighthouseGroupName: 'cscs-grp-finops-lighthouse-prod',

  // Cuentas que el cliente debe invitar si elige la opción de invitados (se muestran en cliente.html).
  guestAccounts: [],

  // Autoridad del inicio de sesión con cuenta CSCloudSolutions. 'organizations' = tenant de origen de la cuenta.
  lighthouseAuthority: 'organizations'
};
