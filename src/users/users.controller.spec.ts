import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = { name: 'John Doe' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: 'John Doe',
    });
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    expect(mockUsersService.create).toHaveBeenCalledTimes(1);
  });

  it('should update a user', () => {
    const dto = { name: 'Jane Doe' };
    expect(controller.update('1', dto)).toEqual({ id: 1, ...dto });
  });
});
