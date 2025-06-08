import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../logger/logger.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

jest.mock('bcrypt', () => ({ compare: jest.fn() }));

const mockPrismaService = {
  user: { findUnique: jest.fn() },
};

const mockJwtService = { sign: jest.fn() };

const mockLoggerService = { error: jest.fn() };

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should return access_token if credentials are valid', async () => {
      const userFromDb = {
        id: 1,
        email: loginDto.email,
        password: 'hashedPassword',
      };

      mockPrismaService.user.findUnique.mockResolvedValueOnce(userFromDb);
      (compare as jest.Mock).mockResolvedValueOnce(true);
      mockJwtService.sign.mockReturnValueOnce('mocked-token');

      const result = await service.login(loginDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(compare).toHaveBeenCalledWith(
        loginDto.password,
        userFromDb.password,
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        userId: userFromDb.id,
        email: userFromDb.email,
      });
      expect(result).toEqual({ acceess_token: 'mocked-token' });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValueOnce(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const userFromDb = {
        id: 1,
        email: loginDto.email,
        password: 'hashedPassword',
      };

      mockPrismaService.user.findUnique.mockResolvedValueOnce(userFromDb);
      (compare as jest.Mock).mockResolvedValueOnce(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should log error and throw NotFoundException on unexpected error', async () => {
      mockPrismaService.user.findUnique.mockRejectedValueOnce(
        new Error('DB error'),
      );

      await expect(service.login(loginDto)).rejects.toThrow(NotFoundException);
      expect(mockLoggerService.error).toHaveBeenCalledWith(
        'Error during login',
        'DB error',
        expect.any(String),
      );
    });
  });
});
