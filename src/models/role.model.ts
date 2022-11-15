import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { RoleName } from '../enums'
import { UserModel } from './user.model'

@Entity('role')
export class RoleModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public uuid!: number

  @Column({ type: 'varchar', nullable: false })
  public name!: RoleName

  @OneToMany(() => UserModel, (user) => user.role)
  public users!: UserModel[]

  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date

  @UpdateDateColumn({ name: 'updated_At' })
  public updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt!: Date
}
