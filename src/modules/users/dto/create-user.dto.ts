import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { IsStrongPassword } from '../../../common/decorators/strongpass.decorator';

@Exclude()
export class CreateUserDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsEmail()
  @Expose()
  readonly email: string;

  @IsStrongPassword()
  @Expose()
  readonly password: string;
}
