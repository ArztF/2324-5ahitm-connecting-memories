import { Document } from 'mongoose';
import { User } from 'src/schema/user.schema';
// declare all the entities which are in the db
export interface IEvent extends Document {
  readonly eventname: string;
  readonly location: string;
  readonly locationcords: string;
  readonly bannerimg: string;
  readonly startdate: Date;
  readonly enddate: Date;
  readonly beschreibung: string;
  readonly kategorie: string;
  readonly veranstalter: string;
  readonly ticketpreis: number;
  readonly isPublic: boolean;
  readonly owner: User;
  readonly participants: [User];
}
