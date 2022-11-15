import bcrypt from 'bcrypt'

export class Bcrypt {
  private readonly salt: number

  constructor (salt = 10) {
    this.salt = salt
  }

  public hash = async (data: string | Buffer): Promise<string> => {
    const hash = await bcrypt.hash(data, this.salt)
    return hash
  }

  public compare = async (data: string | Buffer, encrypted: string): Promise<boolean> => {
    const match = await bcrypt.compare(data, encrypted)
    return match
  }
}
