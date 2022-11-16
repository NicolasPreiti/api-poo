import { NextFunction, Response } from 'express'
import { RoleId } from '../enums'
import { CustomError } from '../helpers/custom-error.helper'
import { HttpResponse } from '../helpers/http-response.helper'
import { TokenRequest } from '../interfaces/token-request.interface'

export class AdminMiddleware {
  constructor (
    private readonly response: HttpResponse
  ) {}

  public validate = (req: TokenRequest, res: Response, next: NextFunction): undefined | Response => {
    try {
      const { roleId } = req.token.data

      if (roleId !== RoleId.admin) throw new CustomError(403, 'endpoint only for admins')
      next()
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }
}
