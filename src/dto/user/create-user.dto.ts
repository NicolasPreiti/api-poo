import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  public email!: string

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
