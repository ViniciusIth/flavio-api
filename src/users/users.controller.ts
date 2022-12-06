import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get(':id/image')
  getProfileImage(@Param('id') id: string) {
    return this.usersService.getProfileImage(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/issub')
  isSubscriber(@Param('id') id: string) {
    return this.usersService.isSubscriber(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/isadmin')
  isAdmin(@Param('id') id: string) {
    return this.usersService.isAdmin(id);
  }
}
