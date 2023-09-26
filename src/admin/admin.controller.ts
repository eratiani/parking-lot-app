import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto, IAdmin } from './adminDto';
import { throwCustomError } from 'src/utility/custom.error';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';

@Controller('admin')
export class AdminController {
  constructor(public readonly adminService: AdminService) {}
  @Post()
  @HttpCode(201)
  async createUser(@Body() body: RegisterAdminDto) {
    throwCustomError(body, 'logIn', 'string');
    throwCustomError(body, 'password', 'string');
    throwCustomError(body, 'email', 'string');
    checkAllowedFields(['logIn', 'password', 'email'], body);
    try {
      const adminId = await this.adminService.registerAdmin(body);
      return { message: 'Admin created successfully', adminId };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }
  @Get()
  getUsers() {
    return this.adminService.getAdmins();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.adminService.getAdmin(id);
  }
  @Patch(':id')
  @HttpCode(204)
  async updateUser(@Param('id') id: string, @Body() body: IAdmin) {
    throwCustomError(body, 'logIn', 'string');
    throwCustomError(body, 'password', 'string');
    throwCustomError(body, 'email', 'string');
    checkAllowedFields(['logIn', 'password', 'email'], body);
    try {
      await this.adminService.updateAdmin(id, body);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }

    return null;
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    await this.adminService.deleteAdmin(id);
    return null;
  }
}
