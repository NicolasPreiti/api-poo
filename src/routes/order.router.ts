import { Router } from 'express'
import type { DataSource, Repository } from 'typeorm'
import { OrderController } from '../controllers/order.controller'
import { CreateOrderDTO } from '../dto/order/create-order.dto'
import { HttpResponse } from '../helpers/http-response.helper'
import { Authentication } from '../middlewares/auth.middleware'
import { DTOValidator } from '../middlewares/validator.middleware'
import { OrderProductModel } from '../models/order-product.model'
import { OrderModel } from '../models/order.model'
import { ProductModel } from '../models/product.model'
import { UserModel } from '../models/user.model'
import { OrderRepository } from '../repositories/order.repository'
import { ProductRepository } from '../repositories/product.repository'
import { UserRepository } from '../repositories/user.repository'
import { OrderService } from '../services/order.service'

export class OrderRouter {
  private readonly _router: Router
  private readonly _response: HttpResponse
  private readonly _repository: OrderRepository
  private readonly _userRepository: UserRepository
  private readonly _productRepository: ProductRepository
  private readonly _opRepository: Repository<OrderProductModel>
  private readonly _service: OrderService
  private readonly _controller: OrderController
  private readonly _validator: DTOValidator
  private readonly _authenticator: Authentication

  constructor (private readonly appDataSource: DataSource) {
    this._router = Router()
    this._response = new HttpResponse()

    this._repository = new OrderRepository(this.appDataSource.getRepository(OrderModel))
    this._userRepository = new UserRepository(this.appDataSource.getRepository(UserModel))
    this._productRepository = new ProductRepository(this.appDataSource.getRepository(ProductModel))
    this._opRepository = this.appDataSource.getRepository(OrderProductModel)

    this._service = new OrderService(this._repository, this._userRepository, this._productRepository, this._opRepository)
    this._controller = new OrderController(this._response, this._service)
    this._validator = new DTOValidator(this._response)
    this._authenticator = new Authentication(this._response)

    this.routes()
  }

  public get router (): Router {
    return this._router
  }

  public routes = (): void => {
    this._router.post(
      '/',
      this._authenticator.validate as any,
      this._validator.start(new CreateOrderDTO()) as any,
      this._controller.create as any
    )

    this._router.get(
      '/',
      this._authenticator.validate as any,
      this._controller.getAll as any
    )

    this._router.get(
      '/:uuid',
      this._authenticator.validate as any,
      this._controller.getOne as any
    )
  }
}
