import { Router } from 'express'
import { DataSource } from 'typeorm'
import { AuthController } from '../controllers'
import { CreateUserDTO } from '../dto/user/create-user.dto'
import { HttpResponse } from '../helpers/http-response.helper'
import { UserMiddleware } from '../middlewares/users/user.middleware'
import { DTOValidator } from '../middlewares/validator.middleware'
import { RoleModel } from '../models/role.model'
import { UserModel } from '../models/user.model'
import { RoleRepository } from '../repositories/role.repository'
import { UserRepository } from '../repositories/user.repository'
import { AuthService } from '../services'

export class AuthRouter {
  private readonly _router: Router
  private readonly _response: HttpResponse
  private readonly _repository: UserRepository
  private readonly _roleRepository: RoleRepository
  private readonly _service: AuthService
  private readonly _controller: AuthController
  private readonly _middleware: UserMiddleware
  private readonly _validator: DTOValidator

  constructor (private readonly AppDataSource: DataSource) {
    this._router = Router()
    this._response = new HttpResponse()

    this._repository = new UserRepository(this.AppDataSource.getRepository(UserModel))
    this._roleRepository = new RoleRepository(this.AppDataSource.getRepository(RoleModel))
    this._service = new AuthService(this._repository, this._roleRepository)
    this._controller = new AuthController(this._response, this._service)
    this._middleware = new UserMiddleware(this._response, this._repository)
    this._validator = new DTOValidator(this._response)

    this.routes()
  }

  public get router (): Router {
    return this._router
  }

  public routes = (): void => {
    this._router.post(
      '/register',
      this._validator.start(new CreateUserDTO()) as any,
      this._middleware.emailInUse as any,
      this._controller.register as any
    )

    this._router.post(
      '/login',
      this._validator.start(new CreateUserDTO()) as any,
      this._controller.login as any
    )
  }
}
