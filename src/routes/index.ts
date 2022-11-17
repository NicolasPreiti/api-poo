import { Router } from 'express'
import { DataSource } from 'typeorm'
import { AuthRouter } from './auth.router'
import { OrderRouter } from './order.router'
import { ProductRouter } from './product.router'
import { UserRouter } from './user.router'

export class RootRouter {
  private readonly _router: Router

  constructor (private readonly AppDataSource: DataSource) {
    this._router = Router()
    this.routes()
  }

  public get router (): Router {
    return this._router
  }

  private routes (): void {
    this._router.use('/auth', new AuthRouter(this.AppDataSource).router)
    this._router.use('/users', new UserRouter(this.AppDataSource).router)
    this._router.use('/products', new ProductRouter(this.AppDataSource).router)
    this._router.use('/orders', new OrderRouter(this.AppDataSource).router)
  }
}
