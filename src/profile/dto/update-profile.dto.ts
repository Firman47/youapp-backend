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
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  horoscope?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  zodiac?: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  interests?: string[];
}
