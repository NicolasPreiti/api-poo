import { Response } from 'express'
import { HttpResponse } from '../helpers/http-response.helper'
import { TokenRequest } from '../interfaces/token-request.interface'
import { OrderService } from '../services/order.service'

export class OrderController {
  constructor (
    private readonly response: HttpResponse,
    private readonly service: OrderService
  ) {}

  public create = async (req: TokenRequest, res: Response): Promise<Response> => {
    try {
      const { uuid } = req.token.data
      const order = await this.service.create(uuid, req.body)

      return this.response.ok(res, 201, order, 'order created')
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }

  public getAll = async (req: TokenRequest, res: Response): Promise<Response> => {
    try {
      const { uuid } = req.token.data
      const orders = await this.service.findAll(uuid)

      return this.response.ok(res, 200, orders)
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }

  public getOne = async (req: TokenRequest, res: Response): Promise<Response> => {
    try {
      const { uuid } = req.params
      const order = await this.service.findOne(uuid)

      return this.response.ok(res, 200, order)
    } catch (err: any) {
      return this.response.failed(res, err.statusCode, err.message)
    }
  }
}
