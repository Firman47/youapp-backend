import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, ValidateIf } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => !o.email)
  @IsString()
  username?: string;

  @ApiProperty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => !o.username)
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  password!: string;
}
