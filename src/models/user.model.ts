import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { RoleModel } from './role.model'

@Entity('user')
export class UserModel {
  @PrimaryColumn()
  public uuid!: string

  @Column({ type: 'varchar', unique: true, nullable: false })
  public email!: string

  @Column({ type: 'varchar', nullable: false })
  public password!: string

  @ManyToOne(() => RoleModel, (role) => role.users)
  public role!: RoleModel

  @CreateDateColumn({ name: 'created_at' })
  public createdAt?: Date

  @UpdateDateColumn({ name: 'updated_At' })
  public updatedAt?: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt?: Date
}
