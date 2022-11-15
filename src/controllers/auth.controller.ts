import { Request, Response } from 'express'
import { HttpResponse } from '../helpers/http-response.helper'
import { JWT } from '../helpers/token.helper'
import { AuthService } from '../services'

export class AuthController {
  private readonly jwt: JWT

  constructor (
    private readonly response: HttpResponse,
    private readonly service: AuthService
  ) {
    this.jwt = new JWT()
  }

  public register = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await this.service.register(req.body)
      const token = this.jwt.generate({
        uuid: user.uuid,
        roleId: user.role.uuid
      })

      this.response.ok(
        res,
        201,
        {
          user,
          token
        },
        'user created')
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }

  public login = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await this.service.login(req.body)
      const token = this.jwt.generate({
        uuid: user.uuid,
        roleId: user.role.uuid
      })

      this.response.ok(
        res,
        200,
        {
          user,
          token
        })
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }
}
