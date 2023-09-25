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
import { checkAllowedFields } from 'src/utility/allowed-fields.error';

@Controller('admin')
export class AdminController {
  constructor(public readonly adminService: AdminService) {}
  @Post()
  @HttpCode(201)
  async createUser(@Body() body: RegisterAdminDto) {
    await this.adminService.registerAdmin(body);
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
    await this.adminService.updateAdmin(id, body);
    return null;
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    await this.adminService.deleteAdmin(id);
    return null;
  }
}
