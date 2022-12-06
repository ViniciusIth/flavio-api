import { IUser, UserAuth } from './user.entity';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User implements Partial<IUser>{
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: 'object' })
  auth: UserAuth;

  @Prop()
  membership?: Date;

  @Prop()
  aboutMe?: string;

  @Prop()
  birthdate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)
