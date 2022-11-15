import { UpdateUserDTO } from '../dto/user/update-user.dto'
import { Bcrypt } from '../helpers/bcrypt.helper'
import { UserModel } from '../models/user.model'
import { UserRepository } from '../repositories/user.repository'

export class UserService {
  private readonly bcrypt: Bcrypt

  constructor (
    private readonly repository: UserRepository
  ) {
    this.bcrypt = new Bcrypt(8)
  }

  public update = async (uuid: string, dto: UpdateUserDTO): Promise<UserModel> => {
    const { password } = dto
    if (password) dto.password = await this.bcrypt.hash(password)

    const user = await this.repository.update(uuid, dto)
    return user
  }

  public delete = async (uuid: string): Promise<void> => {
    await this.repository.delete(uuid)
  }
}
