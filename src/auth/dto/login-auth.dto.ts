import { IsEmail, IsString, ValidateIf } from 'class-validator';

export class LoginAuthDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => !o.email)
  @IsString()
  username?: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => !o.username)
  @IsEmail()
  email?: string;

  @IsString()
  password!: string;
}
