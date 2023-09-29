import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsEmail } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // request to save a user
  @Post()
  async createUser(@Res() response, @Body() CreateUserDto: CreateUserDto) {
    // call the function in the service
    const newUser = await this.userService.createUser(CreateUserDto);
    // return if everything went well
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  // request to get all users
  @Get()
  async getUsers(@Res() response) {
    try {
      // call the funcitn in the service to get all users
      const userData = await this.userService.getAllUsers();
      // return if everything went well
      return response.status(HttpStatus.OK).json({
        userData,
      });
      // throw an error
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // request to get one user by id
  @Get('/:id')
  async getUserById(@Res() response, @Param('id') userId: string) {
    try {
      // call the function in the service and give the id
      const existingUser = await this.userService.getUserById(userId);
      // if the user exists return positive status code
      return response.status(HttpStatus.OK).json({
        existingUser,
      });
      // throw an error
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // get user by email address
  @Get('/email/:email')
  async findByMail(@Res() response, @Param('email') email: string) {
    try {
      // call the function in the service and give the email
      const existingUser = await this.userService.findByMail(email);
      // if the user exists return positive status code
      return response.status(HttpStatus.OK).json({
        existingUser,
      });
      // throw an error
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // request to delete a user by id
  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      // call a function in the service and give the id
      const deletedUser = await this.userService.deleteUser(userId);
      // if the user is found and delete return positive status code
      return response.status(HttpStatus.OK).json({
        deletedUser,
      });
      // else return an error
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // request to update the user by id
  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      // call the funciton in the service an give the id and the new values
      const existingUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      // if updated successfully return positive status code
      return response.status(HttpStatus.OK).json({
        existingUser,
      });
      // else throw an error
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
