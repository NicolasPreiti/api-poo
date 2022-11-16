import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  public name!: string

  @IsNotEmpty()
  @IsString()
  public description!: string

  @IsNotEmpty()
  @IsNumber()
  public price!: number

  @IsNotEmpty()
  @IsNumber()
  public stock!: number

  public new? = (body: this): this => {
    const { name, description, price, stock } = body

    this.name = name
    this.description = description
    this.price = price
    this.stock = stock

    return this
  }
}
