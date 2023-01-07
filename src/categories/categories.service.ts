import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(CategoryDto: CreateCategoryDto) {
    const newCategory = new this.categoryModel(CategoryDto);
    return await newCategory.save();
  }

  async findAll() {
    const categories = await this.categoryModel.find().limit(16).exec();
    return categories;
  }

  async findOne(id: string) {
    return await this.categoryModel.findById(id).populate('articles').exec()
  }

  update(id: string, CategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id).exec();
  }

  // Article array

  async addArticle(id: string, articleId: string) {
    return await this.categoryModel
      .findByIdAndUpdate(id, { $push: { articles: articleId } })
      .exec();
  }

  async removeArticle(id: string, articleId: string) {
    return await this.categoryModel
      .findByIdAndUpdate(id, { $pull: { articles: articleId } })
      .exec();
  }
}
