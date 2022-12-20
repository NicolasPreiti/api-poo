import { DeleteObjectCommand, DeleteObjectCommandInput, DeleteObjectCommandOutput, GetObjectCommand, GetObjectCommandInput, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { awsS3Config } from '../config/aws-s3.config'

export class AwsS3Client {
  public client: S3Client
  public bucket: string | undefined
  private readonly expiresIn = 10000
  private readonly clientConfig: S3ClientConfig

  constructor (bucket?: string) {
    this.bucket = bucket
    this.clientConfig = awsS3Config
    this.client = new S3Client(this.clientConfig)
  }

  public putObject = async (input: PutObjectCommandInput): Promise<PutObjectCommandOutput> => {
    const data = await this.client.send(new PutObjectCommand(input))

    return data
  }

  public deleteObject = async (input: DeleteObjectCommandInput): Promise<DeleteObjectCommandOutput> => {
    const data = await this.client.send(new DeleteObjectCommand(input))
    return data
  }

  public getSignedUrl = async (input: GetObjectCommandInput): Promise<string> => {
    const url = await getSignedUrl(this.client, new GetObjectCommand(input), {
      expiresIn: this.expiresIn
    })
    return url
  }
}
