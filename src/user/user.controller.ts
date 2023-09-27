import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IUser, RegisterUserDto } from './userDto';
import { UserService } from './user.service';
import { throwCustomError } from 'src/utility/custom.error';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(public readonly userService: UserService) {}
  @Post()
  async createUser(@Body() body: RegisterUserDto) {
    throwCustomError(body, 'logIn', 'string');
    throwCustomError(body, 'password', 'string');
    throwCustomError(body, 'email', 'string');
    checkAllowedFields(['logIn', 'password', 'email'], body);
    try {
      return await this.userService.registerUser(body);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    try {
      return await this.userService.getUser(id);
    } catch (error) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: RegisterUserDto) {
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
    try {
      await this.userService.updateUser(id, body);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
      }
    }

    return null;
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    return null;
  }
}
