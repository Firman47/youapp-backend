import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty()
  @IsDateString()
  birthday!: string;

  @ApiProperty()
  @IsString()
  horoscope!: string;

  @ApiProperty()
  @IsString()
  zodiac!: string;

  @ApiProperty()
  @IsNumber()
  height!: number;

  @ApiProperty()
  @IsNumber()
  weight!: number;

  @ApiProperty()
  @IsString()
  bio!: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];
}
