import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender!: string;

  @Prop({ required: true })
  birthday!: Date;

  @Prop({ required: true })
  horoscope!: string;

  @Prop({ required: true })
  zodiac!: string;

  @Prop({ required: true })
  height!: number;

  @Prop({ required: true })
  weight!: number;

  @Prop({ required: true })
  bio!: string;

  @Prop({ type: [String], default: [] })
  interests!: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
