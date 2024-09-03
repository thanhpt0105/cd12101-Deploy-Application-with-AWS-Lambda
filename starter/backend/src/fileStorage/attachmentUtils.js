import { PutObjectCommand, S3, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createLogger } from '../utils/logger.mjs'

const s3Client = new S3Client()
const bucketName = process.env.TODOS_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
const log = createLogger('AttachmentUtils')

export async function generatePresignedUrl(attachmentId) {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: attachmentId
    })
    const url = await getSignedUrl(s3Client, command, {
        expiresIn: urlExpiration
    })
    log.info(`generatePresignedUrl: ${url}`)
    return url
}