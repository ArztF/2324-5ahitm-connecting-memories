import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly vorname: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly nachname: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  readonly geburtsdatum: Date;

  @IsNotEmpty()
  @IsBoolean()
  readonly isVeranstalter: boolean;
}
