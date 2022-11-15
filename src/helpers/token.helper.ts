import jwt, { JwtPayload } from 'jsonwebtoken'
import { tokenConfig } from '../config/jwt.config'

export class JWT {
  private readonly secretKey: string
  private readonly options: jwt.SignOptions
  private readonly config: typeof tokenConfig

  constructor () {
    this.config = tokenConfig
    this.secretKey = this.config.secretKey
    this.options = {
      expiresIn: '10d'
    }
  }

  public generate = (data: string | object | Buffer): string => {
    const token = jwt.sign({ data }, this.secretKey, this.options)
    return token
  }

  public verify = (token: string): JwtPayload => {
    const decoded = jwt.verify(token, this.secretKey) as JwtPayload
    return decoded
  }
}
