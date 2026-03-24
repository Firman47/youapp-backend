import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<ProfileDocument>,
  ) {}

  async create(data: CreateProfileDto) {
    const profile = new this.profileModel(data);
    return await profile.save();
  }

  async update(id: string, data: UpdateProfileDto) {
    const profile = await this.profileModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async findAll() {
    return await this.profileModel.find();
  }

  async findById(id: string) {
    const profile = await this.profileModel.findById(id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async delete(id: string) {
    const profile = await this.profileModel.findByIdAndDelete(id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }
}
