export class User {
  id: string;
  vorname: string;
  nachname: string;
  username: string;
  email: string;
  password: string;
  geburtsdatum: Date;
  isVeranstalter: boolean;
  favouriteEvents: [Event]
}
