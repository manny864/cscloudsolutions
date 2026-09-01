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

  // Asegurar que el contenedor existe sin solicitar acceso público
  await containerClient.createIfNotExists();

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

  // Servir mediante endpoint seguro de medios integrado y CDN-cached
  const mediaUrl = `/api/media/${blobName}`;

  return {
    url: mediaUrl,
    filename: blobName,
    sizeBytes: fileBuffer.length,
  };
}

export async function getBlobBuffer(blobName: string) {
  if (!connectionString) {
    throw new Error('AZURE_STORAGE_CONNECTION_STRING no está configurado');
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const exists = await blockBlobClient.exists();
  if (!exists) return null;

  const downloadBlockBlobResponse = await blockBlobClient.download();
  const contentType = downloadBlockBlobResponse.contentType || 'image/jpeg';
  
  const stream = downloadBlockBlobResponse.readableStreamBody;
  if (!stream) return null;

  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return {
    buffer: Buffer.concat(chunks),
    contentType,
  };
}
