import { Request, Response } from 'express'
import { HttpResponse } from '../helpers/http-response.helper'
import { AwsS3Client } from '../libs/aws-s3'
import { ProductService } from '../services/product.service'

export class ProductController {
  constructor (
    private readonly response: HttpResponse,
    private readonly service: ProductService,
    private readonly S3Client: AwsS3Client
  ) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const file = req.file
      const product = await this.service.create(req.body, file as Express.Multer.File)

      return this.response.ok(res, 201, product, 'product created')
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { limit, offset } = req.query
      const products = await this.service.findAll({ limit, offset })

      return this.response.ok(res, 200, products)
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }

  public getOne = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { uuid } = req.params
      const product = await this.service.findOne(uuid)

      return this.response.ok(res, 200, product)
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { uuid } = req.params
      const product = await this.service.update(uuid, req.body)

      return this.response.ok(res, 200, product, 'product updated')
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { uuid } = req.params
      await this.service.delete(uuid)

      return this.response.ok(res, 200, {}, 'product deleted')
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }
}
