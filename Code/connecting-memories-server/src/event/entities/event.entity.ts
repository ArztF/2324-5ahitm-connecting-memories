import { User } from 'src/schema/user.schema';
export class Event {
  eventname: string;
  location: string;
  locationcords: string;
  bannerimg: string;
  startdate: Date;
  enddate: Date;
  beschreibung: string;
  kategorie: string;
  veranstalter: string;
  ticketpreis: number;
  isPublic: boolean;
  owner: User;
  participants: [User];
}
