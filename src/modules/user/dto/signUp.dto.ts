import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'É necessário enviar o name' })
  @IsString()
  public name: string;

  @IsNotEmpty({ message: 'É necessário enviar o email' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  public email: string;

  @IsNotEmpty({ message: 'É necessário enviar o imageUrl' })
  @IsString()
  public imageUrl: string;

  @IsNotEmpty({ message: 'É necessário enviar a password' })
  @IsString()
  public password: string;
}
