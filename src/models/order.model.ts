import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { OrderProductModel } from './order-product.model'
import { UserModel } from './user.model'

@Entity('order')
export class OrderModel {
  @PrimaryColumn({ type: 'varchar', unique: true, nullable: false })
  public uuid!: string

  @ManyToOne(() => UserModel, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  public user!: UserModel

  @OneToMany(() => OrderProductModel, (op) => op.order)
  public orderProducts?: OrderProductModel[]

  @CreateDateColumn({ name: 'created_at' })
  public createdAt?: Date

  @UpdateDateColumn({ name: 'updated_At' })
  public updatedAt?: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt?: Date
}
