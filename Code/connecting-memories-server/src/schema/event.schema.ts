import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

export enum kategorieType {
  Konzert = 'konzert',
  Festival = 'festival',
  Kultur = 'kultur',
  Business = 'business',
  Andere = 'andere',
}

@Schema()
export class Event {
  @Prop()
  eventname: string;

  @Prop()
  location: string;

  @Prop()
  locationcords: string;

  @Prop()
  bannerimg: string;

  @Prop()
  startdate: Date;

  @Prop()
  enddate: Date;

  @Prop()
  beschreibung: string;

  @Prop({ enum: kategorieType })
  kategorie: string;

  @Prop()
  veranstalter: string;

  @Prop()
  ticketpreis: number;

  @Prop()
  isPublic: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], required: false })
  participants: [User];
}
export const EventSchema = SchemaFactory.createForClass(Event);
