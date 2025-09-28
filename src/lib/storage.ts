import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

interface StorageConfig {
  accessKeyId: string
  secretAccessKey: string
  region: string
  endpoint?: string
  bucket: string
}

function getStorageConfig(): StorageConfig {
  // Check if using Cloudflare R2
  if (process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_ENDPOINT) {
    return {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      region: 'auto', // R2 uses 'auto' as region
      endpoint: process.env.R2_ENDPOINT,
      bucket: process.env.R2_BUCKET || '',
    }
  }

  // Default to AWS S3
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('Missing AWS credentials or R2 credentials')
  }

  return {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET || '',
  }
}

// Initialize S3 client
let s3Client: S3Client | null = null

function getS3Client(): S3Client {
  if (!s3Client) {
    const config = getStorageConfig()
    
    const clientConfig: any = {
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    }

    // Add endpoint for R2
    if (config.endpoint) {
      clientConfig.endpoint = config.endpoint
      clientConfig.forcePathStyle = true
    }

    s3Client = new S3Client(clientConfig)
  }

  return s3Client
}

export interface GenerateDownloadUrlParams {
  fileKey: string
  expiresIn?: number // seconds, default 1 hour
  fileName?: string
}

export async function generateDownloadUrl({
  fileKey,
  expiresIn = 3600, // 1 hour default
  fileName,
}: GenerateDownloadUrlParams): Promise<{ url: string; expiresAt: string }> {
  try {
    const config = getStorageConfig()
    const client = getS3Client()

    const command = new GetObjectCommand({
      Bucket: config.bucket,
      Key: fileKey,
      ResponseContentDisposition: fileName 
        ? `attachment; filename="${fileName}"` 
        : undefined,
    })

    const url = await getSignedUrl(client, command, {
      expiresIn,
    })

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()

    return { url, expiresAt }
  } catch (error) {
    console.error('Error generating download URL:', error)
    throw new Error('Failed to generate download URL')
  }
}

export async function generateShortLivedDownloadUrl(
  fileKey: string,
  fileName?: string
): Promise<{ url: string; expiresAt: string }> {
  // Generate URL that expires in 15 minutes
  return generateDownloadUrl({
    fileKey,
    expiresIn: 900, // 15 minutes
    fileName,
  })
}

export async function generateLongLivedDownloadUrl(
  fileKey: string,
  fileName?: string
): Promise<{ url: string; expiresAt: string }> {
  // Generate URL that expires in 7 days
  return generateDownloadUrl({
    fileKey,
    expiresIn: 604800, // 7 days
    fileName,
  })
}

// Utility function to validate file exists (optional - for debugging)
export async function checkFileExists(fileKey: string): Promise<boolean> {
  try {
    const config = getStorageConfig()
    const client = getS3Client()

    const command = new GetObjectCommand({
      Bucket: config.bucket,
      Key: fileKey,
    })

    await client.send(command)
    return true
  } catch (error) {
    console.error('File does not exist:', error)
    return false
  }
}

export function getFileKeyForProduct(productId: string): string {
  // Map product IDs to file keys
  const fileKeyMap: Record<string, string> = {
    'potty-training-3-days': 'guides/potty-training-3-days.pdf',
    'stop-snoring-7-days': 'guides/stop-snoring-7-days.pdf',
    'fix-dark-circles-naturally': 'guides/fix-dark-circles-naturally.pdf',
  }

  const fileKey = fileKeyMap[productId]
  if (!fileKey) {
    throw new Error(`No file key found for product: ${productId}`)
  }

  return fileKey
}
