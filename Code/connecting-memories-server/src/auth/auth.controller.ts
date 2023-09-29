import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { userDetails } from 'src/user/entities/user-details.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // Function to register the user
  @Post('register')
  register(@Body() user: CreateUserDto): Promise<userDetails | HttpException> {
    return this.authService.register(user);
  }

  // function to login the user
  @Post('login')
  login(
    @Body() user: ExistingUserDto,
  ): Promise<{ token: string } | HttpException> {
    return this.authService.login(user);
  }
}
