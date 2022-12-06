import { jwtConstants } from './auth.constant';
import { UserDocument } from './../users/entities/user.schema';
import { UsersService } from '../users/users.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    const user = await this._validateUser(email, password);

    if (user) {
      const jwt = await this._generateJwt(user);
      const safeUser = this.usersService._toUserDataSafe(user);
      return { auth: { ...jwt, role: user.auth.role }, ...safeUser };
    }

    throw new ForbiddenException();
  }

  async _validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async _generateJwt(user: UserDocument) {
    const payload = { id: user._id, email: user.email };

    return {
      expiration: new Date(new Date().getTime() + jwtConstants.expiration * 60000),
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
