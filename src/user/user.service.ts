import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new this.userModel({ ...data, password: hashedPassword });

    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findByEmailOrUsername(username: string, email: string) {
    return this.userModel
      .findOne({
        $or: [{ username: username }, { email: email }],
      })
      .select('+password');
  }

  async findByCredential(credential: string) {
    return this.userModel
      .findOne({
        $or: [{ email: credential }, { username: credential }],
      })
      .select('+password');
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
