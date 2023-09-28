import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from 'src/user/userDto';
import { UserService } from 'src/user/user.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';
import { throwCustomError } from 'src/utility/custom.error';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @UseGuards(localAuthGuard)
  @Post('logIn')
  async logIn(@Request() req) {
    return await this.authService.logIn(req.user);
  }
  @Post('register')
  async registerUser(@Body() user: RegisterUserDto) {
    // throwCustomError(Body, 'logIn', 'string');
    // throwCustomError(Body, 'password', 'string');
    // throwCustomError(Body, 'email', 'string');
    // checkAllowedFields(['logIn', 'password', 'email'], Body);
    return await this.userService.registerUser(user);
  }
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
