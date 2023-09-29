import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';


@Schema()
export class User {
  @Prop()
  vorname: string;

  @Prop()
  nachname: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  geburtsdatum: Date;

  @Prop()
  isVeranstalter: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}], required: false })
  favouriteEvents: [Event]

}
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDokument = User & Document;
