import { CreateProductDTO } from '../dto/product/create-product.dto'
import { UpdateProductDTO } from '../dto/product/update-product.dto'
import { Uuid } from '../helpers/uuid.helper'
import { ProductModel } from '../models/product.model'
import { ProductRepository } from '../repositories/product.repository'

export class ProductService {
  private readonly uuid: Uuid

  constructor (
    private readonly repository: ProductRepository
  ) {
    this.uuid = new Uuid()
  }

  public create = async (body: CreateProductDTO): Promise<ProductModel> => {
    const uuid = this.uuid.generate()

    const product = await this.repository.create({
      uuid,
      ...body
    })

    return product
  }

  public findAll = async ({ limit, offset }: any): Promise<ProductModel[]> => {
    const products = await this.repository.findAll({
      limit,
      offset
    })

    return products
  }

  public findOne = async (uuid: string): Promise<ProductModel> => {
    const product = await this.repository.findOne(uuid)
    return product
  }

  public update = async (uuid: string, body: UpdateProductDTO): Promise<ProductModel> => {
    const product = await this.repository.update(uuid, body)
    return product
  }

  public delete = async (uuid: string): Promise<void> => {
    await this.repository.delete(uuid)
  }
}
