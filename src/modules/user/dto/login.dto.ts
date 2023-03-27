import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Formato de email inválido' })
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
