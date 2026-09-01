import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'cms-media';

export async function uploadToBlobStorage(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<{ url: string; filename: string; sizeBytes: number }> {
  if (!connectionString) {
    throw new Error('AZURE_STORAGE_CONNECTION_STRING no está configurado');
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Asegurar que el contenedor existe
  await containerClient.createIfNotExists({
    access: 'blob',
  });

  const timestamp = Date.now();
  const cleanName = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
  const blobName = `${timestamp}-${cleanName}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: mimeType,
      blobCacheControl: 'public, max-age=31536000, immutable',
    },
  });

  return {
    url: blockBlobClient.url,
    filename: blobName,
    sizeBytes: fileBuffer.length,
  };
}
