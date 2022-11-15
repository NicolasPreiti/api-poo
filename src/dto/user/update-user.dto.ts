import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  public email!: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(6)
  public password!: string

  public new? = (body: this): this => {
    const { email, password } = body

    this.email = email
    this.password = password

    return this
  }
}
