import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { LoggerService } from '../logger/logger.service';

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

const mockLoggerService = {
  error: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'plainpassword',
    };

    it('should throw ConflictException if user already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValueOnce({
        id: 1,
        email: createUserDto.email,
      });
      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: createUserDto.email },
      });
    });

    it('should create user successfully if email is unique', async () => {
      mockPrismaService.user.findUnique.mockResolvedValueOnce(null);
      mockPrismaService.user.create.mockResolvedValueOnce({
        id: 1,
        ...createUserDto,
        password: hashSync(createUserDto.password, 10),
      });

      const result = await service.create(createUserDto);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email', createUserDto.email);
      expect(result).not.toHaveProperty('plainpassword');
    });

    it('should log and rethrow errors from prisma', async () => {
      const error = new Error('DB is down');
      mockPrismaService.user.findUnique.mockRejectedValueOnce(error);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockLoggerService.error).toHaveBeenCalledWith(
        'Error creating user',
        error.message,
        error.stack,
      );
    });
  });
});
