import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from '../../../modules/prisma/prisma.service';

@Injectable()
export class OptionalGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader: string | undefined = request.headers['authorization'];
    if (!authHeader) {
      return true;
    }

    const token = authHeader.split(' ')[1];
    // console.log('\x1b[36m%s\x1b[0m', token);
    try {
      const payload = this.jwtService.verify<{
        userId: string;
        email: string;
      }>(token, {
        algorithms: ['HS256'],
      });
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.userId },
      });
      request.user = user as User;
    } catch (error) {
      console.error('No token provided :', error);
      return true;
    }

    return true;
  }
}
