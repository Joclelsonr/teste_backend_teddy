import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from '../../../common/decorators/strongpass.decorator';

export class LoginDto {
  @ApiProperty({
    title: 'User email',
    description: 'Email of the user',
    example: 'jhondoe@email.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    title: 'User password',
    description: 'Password of the user',
    example: 'StrongPass@123',
    minLength: 8,
  })
  @IsStrongPassword()
  readonly password: string;
}
