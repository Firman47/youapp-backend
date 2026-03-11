import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthService = {
  login: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('calls authService.login with body and returns its result', async () => {
      const dto = { username: 'foo', password: 'bar' };
      (mockAuthService.login as jest.Mock).mockResolvedValue('token');

      const result = await controller.login(dto as any);
      expect(result).toBe('token');
      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
    });
  });
});
