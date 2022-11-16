import { NextFunction, Response } from 'express'
import { CustomError } from '../helpers/custom-error.helper'
import { HttpResponse } from '../helpers/http-response.helper'
import { JWT } from '../helpers/token.helper'
import { TokenRequest } from '../interfaces/token-request.interface'

export class Authentication {
  private readonly jwt: JWT

  constructor (
    private readonly response: HttpResponse
  ) {
    this.jwt = new JWT()
  }

  public validate = (req: TokenRequest, res: Response, next: NextFunction): undefined | Response => {
    try {
      const { authorization } = req.headers
      const token = authorization?.split(' ')[1]

      if (token === undefined) throw new CustomError(401, 'please send a token')
      const payload = this.jwt.verify(token)

      req.token = payload
      next()
    } catch (err: any) {
      return this.response.failed(res, 401, err.message)
    }
  }
}
