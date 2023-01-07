import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './entities/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const newArticle = new this.articleModel(createArticleDto);

    newArticle.timestamp = new Date();
    return await newArticle.save();
  }

  findFilter(page: number) {
    // const articles = this.articleModel
    //   .find()
    //   .skip((page - 1) * 16)
    //   .limit(16);
    // return articles;

    throw new NotImplementedException();
  }

  async findOne(id: string) {
    const article = this.articleModel.findById(id);

    return await article.populate('author', ['id', 'name']).exec();
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto)
      .exec();
  }

  remove(id: string) {
    return `This action removes a #${id} article`;
  }

  publish(id: string) {
    return this.articleModel.findByIdAndUpdate(id, { isPublic: true });
  }

  setVideo(id: string, hasVideo: boolean) {
    return this.articleModel.findByIdAndUpdate(id, { hasVideo: hasVideo });
  }

  setPremium(id: string, isPremium: boolean) {
    return this.articleModel.findByIdAndUpdate(id, { isPremium: isPremium });
  }
}
