import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

const mockUsersService = {
  create: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create and return the result', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securepassword',
      };

      const mockResponse = {
        id: 1,
        email: dto.email,
        name: dto.name,
      };

      mockUsersService.create.mockResolvedValueOnce(mockResponse);

      const result = await controller.create(dto);

      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });
});
