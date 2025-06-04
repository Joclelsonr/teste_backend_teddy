import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
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
  }
}
