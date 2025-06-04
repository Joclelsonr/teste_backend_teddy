import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiDocLoginGeneric } from 'src/common/decorators/docs/api-doc-login-generic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiDocLoginGeneric('user')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
