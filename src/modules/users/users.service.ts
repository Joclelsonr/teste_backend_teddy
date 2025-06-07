import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashSync } from 'bcrypt';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);
      if (existingUser)
        throw new ConflictException('User with this email already exists');

      const userCreated = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: hashSync(
            createUserDto.password,
            Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
          ),
        },
      });
      return { ...userCreated, password: undefined };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';
      this.loggerService.error('Error creating user', errorMessage, errorStack);
      throw new ConflictException(errorMessage);
    }
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }
}
