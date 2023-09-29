import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { userDetails } from 'src/user/entities/user-details.entity';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  // function to register
  async register(
    user: Readonly<CreateUserDto>,
  ): Promise<userDetails | HttpException> {
    // get the current date
    const actualDate = new Date;
    // create a user json
    const {
      vorname,
      nachname,
      email,
      username,
      password,
      geburtsdatum,
      isVeranstalter,
    } = user;

    let invalidInputs = [];
    // create the regex for the email
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // check if the email is valid
    const validMail: boolean = expression.test(email);

    // if email not valid throw an error
    if (!validMail)
      throw new HttpException('Diese Email ist nicht korrekt!', HttpStatus.BAD_REQUEST);

    // check if the email already exists in the db
    const existingUser = await this.userService.findByMail(email);
    // if so throw an error
    if (existingUser)
      throw new HttpException('Diese Mail existiert bereits!', HttpStatus.FORBIDDEN);

    let birthdate = new Date(geburtsdatum);

    if (birthdate >= actualDate)
      throw new HttpException('Das Geburtsdatum muss kleiner wie das aktuelle Datum sein!', HttpStatus.BAD_REQUEST);

    // save the valid values in the above created json
    const newUser = await this.userService.createUser({
      vorname,
      nachname,
      username,
      email,
      password,
      geburtsdatum,
      isVeranstalter,
    });
    // return the json in order to push it in the db
    return this.userService._getUserDetails(newUser);
  }

  async passwordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<userDetails | null> {
    const user = await this.userService.findByMail(email);
    const userExist = !!user;

    if (!userExist) throw new HttpException('Email existiert nicht!', HttpStatus.BAD_REQUEST);

    const doespasswordMatch = await this.passwordMatch(password, user.password);
    if (!doespasswordMatch) throw new HttpException('Passwort ist nicht korrekt!', HttpStatus.BAD_REQUEST);

    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: ExistingUserDto,
  ): Promise<{ token: string } | HttpException> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email.toLowerCase(), password);

    if (!user)
      return new HttpException('Wrong credentials', HttpStatus.FORBIDDEN);

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
