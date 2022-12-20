import { NextFunction, Request, Response } from 'express'
import multer, { memoryStorage, Multer } from 'multer'
import { HttpResponse } from '../helpers/http-response.helper'

export class MulterMiddle {
  public upload!: Multer

  constructor (
    private readonly response: HttpResponse
  ) {
    this.upload = multer({
      storage: memoryStorage()
    })
  }

  public single = (fieldname: string): [(req: Request, res: Response, next: NextFunction) => void] => [
    (req: Request, res: Response, next: NextFunction) => {
      const middleware = this.upload.single(fieldname)

      middleware(req, res, (err) => {
        const file = req.file

        if (file === undefined) return this.response.failed(res, 400, 'image field must contain a file')
        if (err !== undefined) return this.response.failed(res, 400, err)

        next()
      })
    }
  ]
}
