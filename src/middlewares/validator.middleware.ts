import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../helpers/http-response.helper'

export class DTOValidator {
  constructor (
    private readonly response: HttpResponse
  ) {}

  public start = (dto: any): unknown => [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = await validate(dto.new(req.body), {
          validationError: {
            target: false
          }
        })
        if (errors.length > 0) throw errors
        next()
      } catch (errors: any) {
        this.response.failed(res, 400, errors)
      }
    }
  ]
}
