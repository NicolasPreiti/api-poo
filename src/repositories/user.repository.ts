import { FindOneOptions, Repository } from 'typeorm'
import { CustomError } from '../helpers/custom-error.helper'
import { UserModel } from '../models/user.model'

export class UserRepository {
  private readonly select: FindOneOptions<UserModel>

  constructor (private readonly repository: Repository<UserModel>) {
    this.select = {
      select: {
        uuid: true,
        email: true,
        password: true,
        role: {
          uuid: true,
          name: true
        }
      },
      relations: {
        role: true
      }
    }
  }

  public create = async (model: UserModel): Promise<UserModel> => {
    const { uuid, email, password, role } = model
    const user = this.repository.create()

    user.uuid = uuid
    user.email = email
    user.password = password
    user.role = role

    return await this.repository.save(user)
  }

  public findAll = async (): Promise<UserModel[]> => {
    const users = await this.repository.find({
      ...this.select
    })

    return users
  }

  public findOne = async (uuid: string): Promise<UserModel> => {
    const user = await this.repository.findOne({
      where: { uuid },
      ...this.select
    })

    if (user === null) throw new CustomError(404, 'user not found')
    return user
  }

  public findByEmail = async (email: string): Promise<UserModel | null> => {
    const user = await this.repository.findOne({
      where: { email },
      ...this.select
    })

    return user
  }

  public update = async (uuid: string, model: Partial<UserModel>): Promise<UserModel> => {
    const { email, password } = model
    const user = await this.findOne(uuid)

    user.email = email as string
    user.password = password as string

    return await this.repository.save(user)
  }

  public delete = async (uuid: string): Promise<void> => {
    const user = await this.findOne(uuid)
    await this.repository.remove(user)
  }
}
