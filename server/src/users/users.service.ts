import { Dependencies, Injectable } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { Model } from 'mongoose';

@Injectable()
@Dependencies(getModelToken(User.name))
export class UsersService {
  constructor(private userModel: Model<User>) {
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({email});
  }

  async createUser(dto: CreateUserDto) {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }
}

