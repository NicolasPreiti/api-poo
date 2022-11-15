import { Repository } from 'typeorm'
import { RoleModel } from '../models/role.model'

export class RoleRepository {
  constructor (private readonly repository: Repository<RoleModel>) {}

  public findOne = async (uuid: number): Promise<RoleModel> => {
    const role = await this.repository.findOne({
      where: { uuid }
    })

    if (role === null) throw new Error('role not found')
    return role
  }
}
