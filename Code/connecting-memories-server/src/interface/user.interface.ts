import { Document } from 'mongoose';
// declare all the entities which are in the db
export interface IUser extends Document {
  readonly vorname: string;
  readonly nachname: string;
  readonly username: string;
  readonly email: string;
  password: string;
  readonly geburtsdatum: Date;
  readonly isVeranstalter: boolean;
  readonly favouriteEvents: [Event];
}
