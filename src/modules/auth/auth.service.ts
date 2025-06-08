import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: loginDto.email },
      });
      if (!user) throw new UnauthorizedException('Invalid credentials');
      const isPasswordValid = await compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = this.jwtService.sign({
        userId: user.id,
        email: user.email,
      });
      return { acceess_token: token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';
      this.loggerService.error('Error during login', errorMessage, errorStack);
      throw new NotFoundException(errorMessage);
    }
  }
}
