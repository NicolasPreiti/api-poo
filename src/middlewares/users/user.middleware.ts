import { NextFunction, Request, Response } from 'express'
import { CreateUserDTO } from '../../dto/user/create-user.dto'
import { CustomError } from '../../helpers/custom-error.helper'
import { HttpResponse } from '../../helpers/http-response.helper'
import { UserRepository } from '../../repositories/user.repository'

export class UserMiddleware {
  constructor (
    private readonly response: HttpResponse,
    private readonly repository: UserRepository
  ) {}

  public emailInUse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email }: CreateUserDTO = req.body
      const user = await this.repository.findByEmail(email)

      if (user !== null) throw new CustomError(400, 'email in use')
      next()
    } catch (err: any) {
      this.response.failed(res, err.statusCode, err.message)
    }
  }
}
