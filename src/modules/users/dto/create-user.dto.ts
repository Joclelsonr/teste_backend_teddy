import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { IsStrongPassword } from '../../../common/decorators/strongpass.decorator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateUserDto {
  @ApiProperty({
    title: 'User name',
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @Expose()
  readonly name: string;

  @ApiProperty({
    title: 'User email',
    description: 'Email of the user',
    example: 'jhondoe@email.com',
  })
  @IsEmail()
  @Expose()
  readonly email: string;

  @ApiProperty({
    title: 'User password',
    description: 'Password of the user',
    example: 'StrongPass@123',
    minLength: 8,
  })
  @IsStrongPassword()
  @Expose()
  readonly password: string;
}
