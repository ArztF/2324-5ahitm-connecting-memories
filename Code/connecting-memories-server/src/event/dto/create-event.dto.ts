import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { User } from 'src/schema/user.schema';
export class CreateEventDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly eventname: string;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsString()
  @IsNotEmpty()
  readonly locationcords: string;

  @IsString()
  @IsNotEmpty()
  readonly bannerimg: string;

  @IsNotEmpty()
  readonly startdate: Date;

  @IsNotEmpty()
  readonly enddate: Date;

  @IsString()
  @IsNotEmpty()
  readonly beschreibung: string;

  @IsString()
  readonly kategorie: string;

  @IsString()
  readonly veranstalter: string;

  @IsNumber()
  readonly ticketpreis: number;

  @IsNotEmpty()
  readonly isPublic: boolean;

  @IsNotEmpty()
  readonly owner: string | User;
}
