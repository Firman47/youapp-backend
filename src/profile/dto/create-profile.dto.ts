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
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(Gender)
  gender!: Gender;

  @IsDateString()
  birthday!: string;

  @IsString()
  horoscope!: string;

  @IsString()
  zodiac!: string;

  @IsNumber()
  height!: number;

  @IsNumber()
  weight!: number;

  @IsString()
  bio!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];
}
