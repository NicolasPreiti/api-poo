import { Response } from 'express'

export class HttpResponse {
  public ok = (res: Response, statusCode: number, data: object | unknown[], message?: string): Response => {
    return res
      .status(statusCode)
      .json({
        statusCode,
        message,
        data
      })
  }

  public failed = (res: Response, statusCode = 500, error: string | unknown[]): Response => {
    return res
      .status(statusCode)
      .json({
        statusCode,
        error
      })
  }
}
