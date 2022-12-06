import { UserDataSafe } from './entities/user.entity';
import { User, UserDocument } from './entities/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  // #region crud functions

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    createdUser.auth.role = 'User'

    return this._toUserDataSafe(await createdUser.save());
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    return this._toUserDataSafe(updatedUser);
  }

  async findById(id: string) {
    return this._toUserDataSafe(await this.userModel.findById(id).exec());
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  // #endregion


  // #region auth functions

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).exec()
  }

  // #endregion

  // #region role functions

  async isAdmin(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user.auth.role === 'Admin';
  }

  async isMember(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (user.membership) {
      const membership =
        user.membership.getTime() - new Date().getTime()

      return membership > 0;
    }

    return false;
  }

  // #endregion


  // #region transforming functions

  _toUserDataSafe(user: UserDocument): UserDataSafe {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
    }
  }

  // #endregion
}

// FIXME: Update won't alter data
