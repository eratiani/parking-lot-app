import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto, IAdmin } from './adminDto';

@Controller('admin')
export class AdminController {
  constructor(public readonly adminService: AdminService) {}
  @Post()
  @HttpCode(201)
  createUser(@Body() body: RegisterAdminDto) {
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
  updateUser(@Param('id') id: string, @Body(ValidationPipe) Body: IAdmin) {
    this.adminService.updateAdmin(id, Body);
    return null;
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    this.adminService.deleteAdmin(id);
    return null;
  }
}
