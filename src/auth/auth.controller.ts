import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LogInUserDto, RegisterUserDto } from 'src/user/userDto';

@Controller('auth')
export class AuthController {
  @Post('register')
  @HttpCode(201)
  async register(@Body() body: RegisterUserDto) {
    //  registration logic
  }
  @Post('logIn')
  @HttpCode(200)
  async logIn(@Body() body: LogInUserDto) {
    //  login  logic
  }
  //   @UseGuards(RefreshGuard)
  //   @Post('refresh')
  //   @HttpCode(200)
  //   async refresh(@Body() refreshDto: RefreshDto) {

  //   }
}
