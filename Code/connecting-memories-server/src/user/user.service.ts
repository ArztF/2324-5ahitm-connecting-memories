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
  ) { }

  // function to save a user
  async createUser(CreateUserDto: CreateUserDto): Promise<IUser> {
    const user = CreateUserDto;
    // hash the passworf
    user.password = await bcrypt.hash(user.password, 12);
    // save the user
    const newUser = await new this.userModel(user);
    return newUser.save();
  }

  // function to get all users
  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel
      .find()
      // populate the events in order to see the whole event infos and not only the id
      .populate('favouriteEvents', '', this.eventModel)
      .exec();

    // if no data found throw an error
    if (!userData || userData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    // return users
    return userData;
  }

  // function to get user by id
  async getUserById(userId: string): Promise<IUser> {
    const existingUser = await this.userModel
      .findById(userId)
      // populate the events in order to see the whole event infos and not only the id
      .populate('favouriteEvents', '', this.eventModel)
      .exec();
    // if no data found throw an error
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    // return the user
    return existingUser;
  }

  // function to get user by mail
  async findByMail(email: string): Promise<IUser> {
    // return user
    return await this.userModel.findOne({ email }).exec();
  }

  // function to delete user by id
  async deleteUser(userId: string): Promise<IUser> {
    // get user by id and delete
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    // if no data found throw an error
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    // return deleted event
    return deletedUser;
  }

  // function to update user
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    // get the user by id and update with the new values which are given
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    // if not data found throw an  error
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    // return updated event
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
