import { Test, TestingModule } from '@nestjs/testing';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Request } from 'express';
import { UpdateUrlDto } from './dto/update-url.dto';
import { OptionalGuard } from '../auth/guard/optional.guard';
import { AuthGuard } from '../auth/guard/auth.guard';

describe('UrlsController', () => {
  let controller: UrlsController;
  let service: UrlsService;

  const mockUrlsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByShortCode: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockRequest = (userId?: string) =>
    ({
      user: userId ? { id: userId } : undefined,
    }) as unknown as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [
        {
          provide: UrlsService,
          useValue: mockUrlsService,
        },
      ],
    })
      .overrideGuard(OptionalGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UrlsController>(UrlsController);
    service = module.get<UrlsService>(UrlsService);
    // jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct args and return response', async () => {
      const dto: CreateUrlDto = { url: 'https://example.com' };
      const userId = 'user123';
      const mockResult = { shortUrl: 'http://localhost/abc123' };

      mockUrlsService.create.mockResolvedValueOnce(mockResult);

      const result = await controller.create(dto, mockRequest(userId));
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(dto, userId);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with userId', async () => {
      const userId = 'user123';
      const mockResult = [{ id: '1', originalUrl: 'https://example.com' }];

      mockUrlsService.findAll.mockResolvedValueOnce(mockResult);

      const result = await controller.findAll(mockRequest(userId));
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAll).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findByShortCode', () => {
    it('should return originalUrl when found', async () => {
      const shortCode = 'abc123';
      const mockResult = { originalUrl: 'https://example.com' };

      mockUrlsService.findByShortCode.mockResolvedValueOnce(mockResult);

      const result = await controller.findByShortCode(shortCode);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findByShortCode).toHaveBeenCalledWith(shortCode);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should call service.update with correct args', async () => {
      const id = 'url-id';
      const userId = 'user123';
      const dto: UpdateUrlDto = { url: 'https://new.com' };
      const mockResult = { id, originalUrl: dto.url };

      mockUrlsService.update.mockResolvedValueOnce(mockResult);

      const result = await controller.update(id, dto, mockRequest(userId));
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(id, dto, userId);
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct args', async () => {
      const id = 'url-id';
      const userId = 'user123';
      const mockResult = { message: 'URL deleted successfully' };

      mockUrlsService.remove.mockResolvedValueOnce(mockResult);

      const result = await controller.remove(id, mockRequest(userId));
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.remove).toHaveBeenCalledWith(id, userId);
      expect(result).toEqual(mockResult);
    });
  });
});
