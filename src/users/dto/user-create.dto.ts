
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsDateString } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsDateString()
  birthdate: Date;
}
