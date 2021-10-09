import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  fname: string;

  @IsNotEmpty()
  lname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;
}
