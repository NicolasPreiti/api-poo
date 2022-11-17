import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { OrderModel } from './order.model'
import { ProductModel } from './product.model'

@Entity('order_product')
export class OrderProductModel {
  @PrimaryColumn({ type: 'varchar', unique: true, nullable: false })
  public uuid!: string

  @ManyToOne(() => OrderModel, (order) => order.orderProducts)
  public order!: OrderModel

  @ManyToOne(() => ProductModel, (product) => product.orderProducts)
  public product!: ProductModel

  @CreateDateColumn({ name: 'created_at' })
  public createdAt?: Date

  @UpdateDateColumn({ name: 'updated_At' })
  public updatedAt?: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt?: Date
}
