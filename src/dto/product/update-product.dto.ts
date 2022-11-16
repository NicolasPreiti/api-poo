import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name!: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public description!: string

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  public price!: number

  @IsOptional()
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
