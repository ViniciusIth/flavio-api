import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './entities/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = new this.commentModel(createCommentDto)
    newComment.timestamp = new Date();
    return await newComment.save()
  }

  async findAll(articleId: string) {
    const comments = await this.commentModel.find({articleId}).populate('author', ['id', 'name']).exec()
    return comments;
  }

  async remove(id: string) {
    return await this.commentModel.findByIdAndRemove(id).exec()
  }
}
