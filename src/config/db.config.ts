import dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'
import { OrderProductModel } from '../models/order-product.model'
import { OrderModel } from '../models/order.model'
import { ProductModel } from '../models/product.model'
import { RoleModel } from '../models/role.model'
import { UserModel } from '../models/user.model'

dotenv.config()
enum DbType {
  mysql = 'mysql'
}

const develop: DataSourceOptions = {
  type: process.env.DB_TYPE as DbType,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [UserModel, RoleModel, ProductModel, OrderModel, OrderProductModel],
  subscribers: [],
  migrations: []
}

const production: DataSourceOptions = {
  type: process.env.P_DB_TYPE as DbType,
  host: process.env.P_DB_HOST,
  port: Number(process.env.P_DB_PORT),
  username: process.env.P_DB_USERNAME,
  password: process.env.P_DB_PASSWORD,
  database: process.env.P_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: []
}

export const dbConfig = {
  production,
  develop
}
