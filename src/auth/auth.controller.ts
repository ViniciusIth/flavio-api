import { AuthService } from './auth.service';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(200)
  login(@Body('email') email, @Body('password') password) {
    return this.authService.login(email, password);
  }
}

