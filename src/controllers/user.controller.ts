import { Response } from 'express'
import { HttpResponse } from '../helpers/http-response.helper'
import { TokenRequest } from '../interfaces/token-request.interface'
import { UserService } from '../services/user.service'

export class UserController {
  constructor (
    private readonly response: HttpResponse,
    private readonly service: UserService
  ) {}

  public update = async (req: TokenRequest, res: Response): Promise<any> => {
    try {
      const { uuid } = req.token.data
      const user = await this.service.update(uuid, req.body)

      this.response.ok(res, 200, user)
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }

  public delete = async (req: TokenRequest, res: Response): Promise<any> => {
    try {
      const { uuid } = req.token.data
      await this.service.delete(uuid)

      this.response.ok(res, 200, {}, 'user deleted')
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }
}
