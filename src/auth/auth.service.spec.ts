import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

// simple stub for the user service used in tests
const mockUserService = {
  findByEmailOrUsername: jest.fn(),
};

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // sample user object used across multiple tests
  const goodUser = {
    _id: '1',
    username: 'user',
    email: 'u@e.com',
    password: 'hashed',
    toObject: function () {
      // return only the data we want exposed
      return { _id: '1', username: 'user', email: 'u@e.com' };
    },
  } as any;

  describe('login', () => {
    beforeEach(() => {
      mockUserService.findByEmailOrUsername.mockReset();
      (bcrypt.compare as jest.Mock).mockReset();
    });

    it('throws when neither username nor email provided', async () => {
      await expect(service.login({ password: 'pass' } as any)).rejects.toThrow(
        'Username or email is required',
      );
    });

    it('throws when user not found', async () => {
      mockUserService.findByEmailOrUsername.mockResolvedValue(null);
      await expect(
        service.login({ username: 'foo', password: 'bar' }),
      ).rejects.toThrow('Invalid email or username');
    });

    it('throws when password is wrong', async () => {
      mockUserService.findByEmailOrUsername.mockResolvedValue(goodUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({ username: 'user', password: 'wrong' }),
      ).rejects.toThrow('Invalid password');
    });

    it('returns token and user object when credentials are valid', async () => {
      mockUserService.findByEmailOrUsername.mockResolvedValue(goodUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('signedToken');

      const result = await service.login({
        username: 'user',
        password: 'pass',
      });
      expect(result).toEqual({
        access_token: 'signedToken',
        user: {
          _id: '1',
          username: 'user',
          email: 'u@e.com',
        },
      });
    });
  });

  describe('validateUser', () => {
    it('returns null when user not found or password mismatch', async () => {
      mockUserService.findByEmailOrUsername.mockResolvedValue(null);
      expect(await service.validateUser('a', 'b')).toBeNull();

      mockUserService.findByEmailOrUsername.mockResolvedValue(goodUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      expect(await service.validateUser('user', 'pw')).toBeNull();
    });

    it('returns user without password when credentials are correct', async () => {
      mockUserService.findByEmailOrUsername.mockResolvedValue(goodUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const validated = await service.validateUser('user', 'pass');
      expect(validated).toEqual({
        _id: '1',
        username: 'user',
        email: 'u@e.com',
      });
    });
  });
});
