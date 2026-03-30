import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResponseMessage } from 'src/common/interceptors/response-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ResponseMessage('Login success')
  login(@Body() body: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(body, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ResponseMessage('Logged out successfully')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
