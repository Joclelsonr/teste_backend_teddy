import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger/logger.service';
import { NotFoundException } from '@nestjs/common';
import { Url } from '@prisma/client';

const mockPrisma = {
  url: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
};

const mockLogger = {
  error: jest.fn(),
};

describe('UrlsService', () => {
  let service: UrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a shortened URL', async () => {
      const createUrlDto = { url: 'https://example.com' };
      const userId = 'user-123';
      const shortCode = 'abc123';

      jest
        .spyOn(service as any, 'generateShortCode')
        .mockReturnValue(shortCode);
      mockPrisma.url.findUnique.mockResolvedValueOnce(null);
      mockPrisma.url.create.mockResolvedValueOnce({ shortUrl: shortCode });

      const result = await service.create(createUrlDto, userId);

      expect(mockPrisma.url.create).toHaveBeenCalledWith({
        data: {
          originalUrl: createUrlDto.url,
          shortUrl: shortCode,
          userId,
        },
      });

      expect(result).toEqual({
        shortUrl: `${process.env.APP_URL}/${shortCode}`,
      });
    });
  });

  describe('findByShortCode', () => {
    it('should return original URL and increment clicks', async () => {
      const shortCode = 'abc123';
      const mockUrl = { originalUrl: 'https://example.com' };

      mockPrisma.url.findUnique.mockResolvedValueOnce(mockUrl);
      mockPrisma.url.update.mockResolvedValueOnce(mockUrl);

      const result = await service.findByShortCode(shortCode);

      expect(result).toEqual({ originalUrl: mockUrl.originalUrl });
    });

    it('should throw NotFoundException if code does not exist', async () => {
      mockPrisma.url.findUnique.mockResolvedValueOnce(null);

      await expect(service.findByShortCode('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all URLs for user', async () => {
      const userId = 'user-123';
      const mockUrls: Url[] = [
        {
          id: '1',
          originalUrl: 'a',
          shortUrl: 'a',
          clicks: 0,
          createdAt: new Date(),
          deletedAt: null,
          updatedAt: new Date(),
          userId,
        },
      ];

      mockPrisma.url.findMany.mockResolvedValueOnce(mockUrls);

      const result = await service.findAll(userId);
      expect(result).toEqual(mockUrls);
    });
  });

  describe('update', () => {
    it('should update a URL if it exists', async () => {
      const id = 'url-1';
      const userId = 'user-123';
      const updateUrlDto = { url: 'https://updated.com' };
      const mockUrl = { id, userId, originalUrl: updateUrlDto.url };

      jest.spyOn(service as any, 'getUrlOrThrow').mockResolvedValueOnce(true);
      mockPrisma.url.update.mockResolvedValueOnce(mockUrl);

      const result = await service.update(id, updateUrlDto, userId);
      expect(result).toEqual(mockUrl);
    });
  });

  describe('remove', () => {
    it('should soft delete the URL', async () => {
      const id = 'url-1';
      const userId = 'user-123';

      jest.spyOn(service as any, 'getUrlOrThrow').mockResolvedValueOnce(true);
      mockPrisma.url.update.mockResolvedValueOnce(true);

      const result = await service.remove(id, userId);
      expect(result).toEqual({ message: 'URL deleted successfully' });
    });
  });
});
