import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get('find')
  findByFilter(
    @Query('tags') tags: string[],
    @Query('author') author: string,
    @Query('page') page: number = 0,
  ) {
    return this.articlesService.findFilter(+page);
  }

  @Get('s/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  // Other

  @Patch(':id/publish')
  publish(@Param('id') id: string) {
    return this.articlesService.publish(id);
  }

  @Patch(':id/set-video')
  setVideo(@Param('id') id: string, @Body('hasVideo') hasVideo: boolean) {
    return this.articlesService.setVideo(id, hasVideo);
  }

  @Patch(':id/set-premium')
  setPremium(@Param('id') id: string, @Body('isPremium') isPremium: boolean) {
    return this.articlesService.setPremium(id, isPremium);
  }
}
