import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { IUser, RegisterUserDto } from './userDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(public readonly userService: UserService) {}
  @Post()
  createUser(@Body() body: RegisterUserDto) {
    this.userService.addUser(body);
  }
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body(ValidationPipe) Body: IUser) {
    this.userService.updateUser(id, Body);
    return null;
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
    return null;
  }
}
