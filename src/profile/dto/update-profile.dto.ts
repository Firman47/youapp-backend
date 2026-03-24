import {
  IsString,
  IsDateString,
  IsNumber,
  IsArray,
  IsOptional,
  IsEnum,
  Min,
  Max,
  MaxLength,
  ArrayMaxSize,
} from 'class-validator';
import { CreateProfileDto, Gender } from './create-profile.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsString()
  horoscope?: string;

  @IsOptional()
  @IsString()
  zodiac?: string;

  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(300)
  height?: number;

  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(300)
  weight?: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  interests?: string[];
}
