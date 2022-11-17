import { FindOneOptions, Repository } from 'typeorm'
import { CustomError } from '../helpers/custom-error.helper'
import { OrderModel } from '../models/order.model'

export class OrderRepository {
  private readonly select: FindOneOptions<OrderModel>

  constructor (private readonly repository: Repository<OrderModel>) {
    this.select = {
      relations: {
        user: true,
        orderProducts: {
          product: true
        }
      },
      select: {
        uuid: true,
        user: {
          uuid: true
        },
        orderProducts: true
      }
    }
  }

  public create = async (model: OrderModel): Promise<OrderModel> => {
    const { uuid, user } = model

    const order = this.repository.create()
    order.uuid = uuid
    order.user = user

    return await this.repository.save(order)
  }

  public findAll = async (uuid: string): Promise<OrderModel[]> => {
    const order = await this.repository.find({
      where: { user: { uuid } },
      ...this.select
    })

    return order
  }

  public findOne = async (uuid: string): Promise<OrderModel> => {
    const order = await this.repository.findOne({
      where: { uuid },
      ...this.select
    })

    if (order === null) throw new CustomError(404, 'order not found')
    return order
  }

  public delete = async (uuid: string): Promise<void> => {
    const order = await this.findOne(uuid)
    await this.repository.remove(order)
  }
}
