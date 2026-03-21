import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginAuthDto, res: Response) {
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

    const token = this.jwtService.sign(payload);

    res.cookie('access_token', token, { httpOnly: true });

    return { access_token: token };
  }

  logout(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return { message: 'Logged out successfully' };
  }
}
