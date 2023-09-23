import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto, IAdmin } from './adminDto';
import { throwCustomError } from 'src/utility/custom.error';

@Controller('admin')
export class AdminController {
  constructor(public readonly adminService: AdminService) {}
  @Post()
  @HttpCode(201)
  createUser(@Body() body: RegisterAdminDto) {
    throwCustomError(body, 'logIn', 'string');
    throwCustomError(body, 'password', 'string');
    throwCustomError(body, 'email', 'string');
    this.adminService.registerAdmin(body);
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
  updateUser(@Param('id') id: string, @Body() body: IAdmin) {
    throwCustomError(body, 'logIn', 'string');
    throwCustomError(body, 'password', 'string');
    throwCustomError(body, 'email', 'string');

    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    this.adminService.updateAdmin(id, body);
    return null;
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    this.adminService.deleteAdmin(id);
    return null;
  }
}
