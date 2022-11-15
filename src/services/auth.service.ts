import { CreateUserDTO } from '../dto/user/create-user.dto'
import { UpdateUserDTO } from '../dto/user/update-user.dto'
import { RoleId } from '../enums'
import { Bcrypt } from '../helpers/bcrypt.helper'
import { Uuid } from '../helpers/uuid.helper'
import { UserModel } from '../models/user.model'
import { RoleRepository } from '../repositories/role.repository'
import { UserRepository } from '../repositories/user.repository'

export class AuthService {
  private readonly uuid: Uuid
  private readonly bcrypt: Bcrypt

  constructor (
    private readonly repository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) {
    this.uuid = new Uuid()
    this.bcrypt = new Bcrypt(8)
  }

  public register = async (dto: CreateUserDTO): Promise<UserModel> => {
    const { email, password } = dto
    const uuid = this.uuid.generate()
    const hashedPassword = await this.bcrypt.hash(password)
    const roleId = RoleId.user
    const role = await this.roleRepository.findOne(roleId)

    const user = await this.repository.create({
      uuid,
      email,
      password: hashedPassword,
      role
    })

    return user
  }

  public login = async (dto: CreateUserDTO): Promise<UserModel> => {
    const { email, password } = dto
    const user = await this.repository.findByEmail(email)

    const match = (user != null)
      ? await this.bcrypt.compare(password, user.password)
      : false

    if ((user == null) || !match) throw new Error('user or password are incorrect')
    return user
  }

  public update = async (uuid: string, dto: UpdateUserDTO): Promise<UserModel> => {
    const { password } = dto
    if (password !== undefined) dto.password = await this.bcrypt.hash(password)

    const user = await this.repository.update(uuid, dto)
    return user
  }

  public delete = async (uuid: string): Promise<void> => {
    await this.repository.delete(uuid)
  }
}
