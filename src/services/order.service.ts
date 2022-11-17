import { Repository } from 'typeorm'
import { CreateOrderDTO } from '../dto/order/create-order.dto'
import { Uuid } from '../helpers/uuid.helper'
import { OrderProductModel } from '../models/order-product.model'
import { OrderModel } from '../models/order.model'
import { OrderRepository } from '../repositories/order.repository'
import { ProductRepository } from '../repositories/product.repository'
import { UserRepository } from '../repositories/user.repository'

export class OrderService {
  private readonly uuid: Uuid

  constructor (
    private readonly repository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly opRepository: Repository<OrderProductModel>
  ) {
    this.uuid = new Uuid()
  }

  public create = async (userUuid: string, body: CreateOrderDTO): Promise<OrderModel> => {
    const { productsId } = body
    const uuid = this.uuid.generate()
    const user = await this.userRepository.findOne(userUuid)
    const products = await Promise.all(productsId.map(async (uuid) => {
      const product = await this.productRepository.findOne(uuid)
      return product
    }))

    const order = await this.repository.create({
      uuid,
      user
    })

    await Promise.all(products.map(async (product) => {
      const uuid = this.uuid.generate()
      const orderProduct = this.opRepository.create()

      orderProduct.uuid = uuid
      orderProduct.order = order
      orderProduct.product = product

      return await this.opRepository.save(orderProduct)
    }))

    return await this.repository.findOne(uuid)
  }

  public findAll = async (uuid: string): Promise<OrderModel[]> => {
    const order = await this.repository.findAll(uuid)
    return order
  }

  public findOne = async (uuid: string): Promise<OrderModel> => {
    const order = await this.repository.findOne(uuid)
    return order
  }
}
