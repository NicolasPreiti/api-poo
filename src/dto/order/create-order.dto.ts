import { IsArray, IsString } from 'class-validator'

export class CreateOrderDTO {
  @IsArray()
  @IsString({
    each: true
  })
  public productsId!: string[]

  public new? = (body: this): this => {
    const { productsId } = body

    this.productsId = productsId

    return this
  }
}
