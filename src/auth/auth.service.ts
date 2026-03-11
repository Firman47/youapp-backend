import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginAuthDto) {
    if (!data.username && !data.email) {
      throw new UnauthorizedException('Username or email is required');
    }

    const user = await this.userService.findByEmailOrUsername(
      data.username || '',
      data.email || '',
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or username');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: user._id,
      username: user.username,
      email: user.email,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toObject();

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }

  async validateUser(credential: string, password: string) {
    const user = await this.userService.findByCredential(credential);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const { password: _password, ...result } = user.toObject();
    return result;
  }
}
