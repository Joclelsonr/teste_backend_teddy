import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UrlsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUrlDto: CreateUrlDto, userId?: string) {
    let shortCode = this.generateShortCode();
    let exists = true;

    while (exists) {
      shortCode = this.generateShortCode();
      exists = !!(await this.prismaService.url.findUnique({
        where: { shortUrl: shortCode },
      }));
    }
    const createdUrl = await this.prismaService.url.create({
      data: {
        originalUrl: createUrlDto.url,
        shortUrl: shortCode,
        userId: userId ? userId : undefined,
      },
    });
    return { shortUrl: `${process.env.APP_URL}/` + createdUrl.shortUrl };
  }

  findAll(id: string) {
    return this.prismaService.url.findMany({ where: { userId: id } });
  }

  async findOne(id: string, userId: string) {
    const exists = await this.findById(id);
    if (!exists) throw new NotFoundException('URL not found');
    return this.prismaService.url.findFirst({ where: { id, userId } });
  }

  async findById(id: string) {
    return await this.prismaService.url.findUnique({ where: { id } });
  }

  async update(id: string, updateUrlDto: UpdateUrlDto, userId: string) {
    const exists = await this.findById(id);
    if (!exists) throw new NotFoundException('URL not found');
    return this.prismaService.url.update({
      where: { id, userId },
      data: { originalUrl: updateUrlDto.url },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} url`;
  }

  private generateShortCode(length = 6): string {
    const chars = process.env.SHORT_CODE_CHARS!;
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
