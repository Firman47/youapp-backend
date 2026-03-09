import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  get(): string {
    return 'Get user';
  }
}
