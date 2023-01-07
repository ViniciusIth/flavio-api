import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Types.Array, default: [], ref: 'Article' })
  articles: string[] | mongoose.Schema.Types.ObjectId[] ;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
