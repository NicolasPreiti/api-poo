import { NextFunction, Request, Response } from 'express'
import sharp from 'sharp'

export class SharpMiddleware {
  public resize = (): [(req: Request, res: Response, next: NextFunction) => void] => [
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.file === undefined) return
      const file = req.file

      const buffer = await sharp(file.buffer)
        .resize(450, 450)
        .toBuffer()

      req.file.buffer = buffer
      next()
    }
  ]
}
