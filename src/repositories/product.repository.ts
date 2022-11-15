import { FindOneOptions, Repository } from 'typeorm'
import { CustomError } from '../helpers/custom-error.helper'
import { ProductModel } from '../models/product.model'

export class ProductRepository {
  private readonly select!: FindOneOptions<ProductModel>

  constructor (
    private readonly repository: Repository<ProductModel>
  ) {
    this.select = {
      select: {
        name: true,
        description: true,
        price: true,
        stock: true
      }
    }
  }

  public create = async (model: ProductModel): Promise<ProductModel> => {
    const { uuid, name, description, price, stock } = model

    const product = this.repository.create()
    product.uuid = uuid
    product.name = name
    product.description = description
    product.price = price
    product.stock = stock

    return await this.repository.save(product)
  }

  public findAll = async ({ offset = 0, limit = 0 }): Promise<ProductModel[]> => {
    const products = await this.repository.find({
      skip: offset,
      take: limit,
      ...this.select
    })

    return products
  }

  public findOne = async (uuid: string): Promise<ProductModel> => {
    const product = await this.repository.findOne({
      where: { uuid },
      ...this.select
    })

    if (product === null) throw new CustomError(404, 'product not found')
    return product
  }

  public update = async (uuid: string, model: Partial<ProductModel>): Promise<ProductModel> => {
    const { name, description, price, stock } = model
    const product = await this.findOne(uuid)

    product.name = name as string
    product.description = description as string
    product.price = price as number
    product.stock = stock as number

    return await this.repository.save(product)
  }

  public delete = async (uuid: string): Promise<void> => {
    const user = await this.findOne(uuid)
    await this.repository.remove(user)
  }
}
