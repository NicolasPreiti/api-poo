import { Router } from 'express'
import type { DataSource } from 'typeorm'
import { UserController } from '../controllers/user.controller'
import { UpdateUserDTO } from '../dto/user/update-user.dto'
import { HttpResponse } from '../helpers/http-response.helper'
import { Authentication } from '../middlewares/auth.middleware'
import { UserMiddleware } from '../middlewares/users/user.middleware'
import { DTOValidator } from '../middlewares/validator.middleware'
import { UserModel } from '../models/user.model'
import { UserRepository } from '../repositories/user.repository'
import { UserService } from '../services/user.service'

export class UserRouter {
  private readonly _router: Router
  private readonly _response: HttpResponse
  private readonly _repository: UserRepository
  private readonly _service: UserService
  private readonly _controller: UserController
  private readonly _middleware: UserMiddleware
  private readonly _validator: DTOValidator
  private readonly _authenticator: Authentication

  constructor (private readonly appDataSource: DataSource) {
    this._router = Router()
    this._response = new HttpResponse()

    this._repository = new UserRepository(this.appDataSource.getRepository(UserModel))
    this._service = new UserService(this._repository)
    this._controller = new UserController(this._response, this._service)
    this._middleware = new UserMiddleware(this._response, this._repository)
    this._validator = new DTOValidator(this._response)
    this._authenticator = new Authentication(this._response)

    this.routes()
  }

  public get router (): Router {
    return this._router
  }

  public routes = (): void => {
    this._router.patch(
      '/',
      this._authenticator.auth as any,
      this._validator.start(new UpdateUserDTO()) as any,
      this._middleware.emailInUse as any,
      this._controller.update as any
    )

    this._router.delete(
      '/',
      this._authenticator.auth as any,
      this._controller.delete as any
    )
  }
}
