import { PutObjectCommandInput } from '@aws-sdk/client-s3'
import { CreateProductDTO } from '../dto/product/create-product.dto'
import { UpdateProductDTO } from '../dto/product/update-product.dto'
import { Uuid } from '../helpers/uuid.helper'
import { AwsS3Client } from '../libs/aws-s3'
import { ProductModel } from '../models/product.model'
import { ProductRepository } from '../repositories/product.repository'

export class ProductService {
  private readonly uuid: Uuid

  constructor (
    private readonly repository: ProductRepository,
    private readonly s3Client: AwsS3Client
  ) {
    this.uuid = new Uuid()
  }

  public create = async (body: CreateProductDTO, image: Express.Multer.File): Promise<ProductModel> => {
    const uuid = this.uuid.generate()
    const filename = image.originalname

    const product = await this.repository.create({
      uuid,
      image: filename,
      ...body
    })

    // AWS
    const params: PutObjectCommandInput = {
      Bucket: 'refrigeracion',
      Key: filename,
      Body: image.buffer
    }
    await this.s3Client.putObject(params)
    const imageUrl = await this.s3Client.getSignedUrl({
      Bucket: params.Bucket,
      Key: params.Key
    })
    product.image = imageUrl

    return product
  }

  public findAll = async ({ limit, offset }: any): Promise<ProductModel[]> => {
    const products = await this.repository.findAll({
      limit,
      offset
    })

    // Call image from aws s3
    await Promise.all(products.map(async (product) => {
      const imageKey = product.image
      const imageUrl = await this.s3Client.getSignedUrl({
        Bucket: 'refrigeracion',
        Key: imageKey
      })

      product.image = imageUrl
    }))

    return products
  }

  public findOne = async (uuid: string): Promise<ProductModel> => {
    const product = await this.repository.findOne(uuid)

    const imageUrl = await this.s3Client.getSignedUrl({
      Bucket: 'refrigeracion',
      Key: product.image
    })

    product.image = imageUrl
    return product
  }

  public update = async (uuid: string, body: UpdateProductDTO): Promise<ProductModel> => {
    const product = await this.repository.update(uuid, body)
    return product
  }

  public delete = async (uuid: string): Promise<void> => {
    await this.repository.delete(uuid)
  }
}
