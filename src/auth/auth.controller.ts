import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from 'src/user/userDto';
import { UserService } from 'src/user/user.service';

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
    return await this.userService.registerUser(user);
  }
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
