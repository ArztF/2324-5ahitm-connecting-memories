import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './../interface/user.interface';
import { User } from './entities/user.entity';
import { UserDokument } from 'src/schema/user.schema';
import { userDetails } from './entities/user-details.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { IEvent } from 'src/interface/event.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
    @InjectModel('Event')
    private readonly eventModel: Model<IEvent>,
  ) {}

  async createUser(CreateUserDto: CreateUserDto): Promise<IUser> {
    const user = CreateUserDto;

    user.password = await bcrypt.hash(user.password, 12);

    const newUser = await new this.userModel(user);
    return newUser.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel
      .find()

      .populate('favouriteEvents', '', this.eventModel)
      .exec();

    if (!userData || userData.length == 0) {
      throw new NotFoundException('User data not found!');
    }

    return userData;
  }

  async getUserById(userId: string): Promise<IUser> {
    const existingUser = await this.userModel
      .findById(userId)

      .populate('favouriteEvents', '', this.eventModel)
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return existingUser;
  }

  async findByMail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return deletedUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return existingUser;
  }

  _getUserDetails(user: UserDokument): userDetails {
    return {
      id: user._id,
      vorname: user.vorname,
      nachname: user.nachname,
      username: user.username,
      email: user.email,
    };
  }
}
