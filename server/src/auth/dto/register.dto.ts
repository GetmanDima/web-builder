import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
  @IsEmail()
  readonly email: string

  @IsString()
  readonly password: string
}
