import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CommentDocument } from 'src/comments/entities/comment.schema';
import { CategoryDocument } from 'src/categories/entities/category.schema';
import { UserDocument } from 'src/users/entities/user.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  timestamp: Date;

  @Prop({ required: true })
  tittle: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  hasVideo: boolean;

  @Prop({ default: true })
  isPremium: boolean;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ type: mongoose.Schema.Types.Array })
  tags: string[];

  @Prop()
  commentCount: number;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: string | mongoose.Schema.Types.ObjectId;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
