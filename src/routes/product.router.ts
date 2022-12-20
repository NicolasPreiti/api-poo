import { Router } from 'express'
import { DataSource } from 'typeorm'
import { ProductController } from '../controllers/product.controller'
import { CreateProductDTO } from '../dto/product/create-product.dto'
import { UpdateProductDTO } from '../dto/product/update-product.dto'
import { HttpResponse } from '../helpers/http-response.helper'
import { AwsS3Client } from '../libs/aws-s3'
import { AdminMiddleware } from '../middlewares/admin.middleware'
import { Authentication } from '../middlewares/auth.middleware'
import { MulterMiddle } from '../middlewares/multer.middleware'
import { SharpMiddleware } from '../middlewares/sharp.middleware'
import { DTOValidator } from '../middlewares/validator.middleware'
import { ProductModel } from '../models/product.model'
import { ProductRepository } from '../repositories/product.repository'
import { ProductService } from '../services/product.service'

export class ProductRouter {
  private readonly _router: Router
  private readonly _response: HttpResponse
  private readonly _repository: ProductRepository
  private readonly _service: ProductService
  private readonly _controller: ProductController
  private readonly _validator: DTOValidator
  private readonly _authenticator: Authentication
  private readonly _admin: AdminMiddleware
  private readonly _upload: MulterMiddle
  private readonly _sharp: SharpMiddleware
  private readonly _S3Client: AwsS3Client

  constructor (private readonly appDataSource: DataSource) {
    this._router = Router()
    this._S3Client = new AwsS3Client()
    this._response = new HttpResponse()
    this._repository = new ProductRepository(this.appDataSource.getRepository(ProductModel))
    this._service = new ProductService(this._repository, this._S3Client)
    this._controller = new ProductController(this._response, this._service, this._S3Client)
    this._validator = new DTOValidator(this._response)
    this._authenticator = new Authentication(this._response)
    this._admin = new AdminMiddleware(this._response)
    this._upload = new MulterMiddle(this._response)
    this._sharp = new SharpMiddleware()

    this.routes()
  }

  public get router (): Router {
    return this._router
  }

  public routes = (): void => {
    this._router.get(
      '/',
      this._controller.getAll as any
    )

    this._router.get(
      '/:uuid',
      this._controller.getOne as any
    )

    this._router.post(
      '/',
      this._authenticator.validate as any,
      this._admin.validate as any,
      this._upload.single('image'),
      this._sharp.resize(),
      // this._validator.start(new CreateProductDTO()) as any,
      this._controller.create as any
    )

    this._router.patch(
      '/:uuid',
      this._authenticator.validate as any,
      this._admin.validate as any,
      this._validator.start(new UpdateProductDTO()) as any,
      this._controller.update as any
    )

    this._router.delete(
      '/:uuid',
      this._authenticator.validate as any,
      this._admin.validate as any,
      this._controller.delete as any
    )
  }
}
