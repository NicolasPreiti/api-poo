import { S3ClientConfig } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

dotenv.config()

export const awsS3Config: S3ClientConfig = {
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string
  }
}
