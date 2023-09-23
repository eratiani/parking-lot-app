import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IUser, RegisterUserDto } from './userDto';
import { UserService } from './user.service';
import { throwCustomError } from 'src/utility/custom.error';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';

@Controller('user')
export class UserController {
  constructor(public readonly userService: UserService) {}
  @Post()
  createUser(@Body() body: RegisterUserDto) {
    throwCustomError(body, 'logIn', 'string');
    throwCustomError(body, 'password', 'string');
    throwCustomError(body, 'email', 'string');
    checkAllowedFields(['logIn', 'password', 'email'], body);
    this.userService.addUser(body);
  }
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    return this.userService.getUser(id);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: IUser) {
    throwCustomError(body, 'logIn', 'string');
    throwCustomError(body, 'password', 'string');
    throwCustomError(body, 'email', 'string');
    checkAllowedFields(
      ['logIn', 'password', 'email', 'cars', 'balance', 'id'],
      body,
    );
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    this.userService.updateUser(id, body);
    return null;
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    this.userService.deleteUser(id);
    return null;
  }
}
