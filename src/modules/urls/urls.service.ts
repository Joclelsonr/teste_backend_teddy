import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger/logger.service';
import { Url } from '@prisma/client';

@Injectable()
export class UrlsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  private async findUniqueShortCode(): Promise<string> {
    let shortCode: string;
    let exists = true;
    do {
      shortCode = this.generateShortCode();
      exists = await this.urlExists(shortCode);
    } while (exists);
    return shortCode;
  }

  private async urlExists(shortCode: string): Promise<boolean> {
    const url = await this.prismaService.url.findUnique({
      where: { shortUrl: shortCode },
    });
    return !!url;
  }

  private async getUrlOrThrow(id: string, userId?: string): Promise<Url> {
    const where = { id, deletedAt: null, ...(userId && { userId }) };
    const url = await this.prismaService.url.findUnique({ where });
    if (!url) throw new NotFoundException('URL not found');
    return url;
  }

  async create(
    createUrlDto: CreateUrlDto,
    userId?: string,
  ): Promise<{ shortCode: string }> {
    try {
      const shortCode = await this.findUniqueShortCode();
      const createdUrl = await this.prismaService.url.create({
        data: {
          originalUrl: createUrlDto.url,
          shortUrl: shortCode,
          ...(userId && { userId }),
        },
      });
      return { shortCode: createdUrl.shortUrl };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';
      this.loggerService.error('Error creating URL', errorMessage, errorStack);
      throw new NotFoundException(errorMessage);
    }
  }

  async findByShortCode(shortCode: string): Promise<{ originalUrl: string }> {
    try {
      const url = await this.prismaService.url.findUnique({
        where: { shortUrl: shortCode, deletedAt: null },
      });
      if (!url) throw new NotFoundException('CODE not found');
      const updateUrl = await this.prismaService.url.update({
        where: { shortUrl: shortCode },
        data: { clicks: { increment: 1 } },
      });
      return { originalUrl: updateUrl.originalUrl };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';
      this.loggerService.error(
        'Error finding URL by short code',
        errorMessage,
        errorStack,
      );
      throw new NotFoundException(errorMessage);
    }
  }

  findAll(userId: string): Promise<Url[]> {
    try {
      return this.prismaService.url.findMany({
        where: { userId, deletedAt: null },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';
      this.loggerService.error('Error fetching URLs', errorMessage, errorStack);
      throw new NotFoundException(errorMessage);
    }
  }

  async update(
    id: string,
    updateUrlDto: UpdateUrlDto,
    userId: string,
  ): Promise<Url> {
    try {
      await this.getUrlOrThrow(id, userId);
      return this.prismaService.url.update({
        where: { id, userId },
        data: { originalUrl: updateUrlDto.url },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';
      this.loggerService.error('Error updating URL', errorMessage, errorStack);
      throw new NotFoundException(errorMessage);
    }
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    try {
      await this.getUrlOrThrow(id, userId);
      await this.prismaService.url.update({
        where: { id, userId },
        data: { deletedAt: new Date() },
      });
      return { message: 'URL deleted successfully' };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';
      this.loggerService.error('Error deleting URL', errorMessage, errorStack);
      throw new NotFoundException(errorMessage);
    }
  }

  private generateShortCode(length = 6): string {
    const chars = process.env.SHORT_CODE_CHARS!;
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join('');
  }
}
