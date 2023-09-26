import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAdminDto, IAdmin } from './adminDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async registerAdmin(admin: RegisterAdminDto): Promise<string> {
    const newAdmin = await this.prisma.admin.create({
      data: admin,
    });
    return newAdmin.id;
  }

  async getAdmins(): Promise<IAdmin[]> {
    return await this.prisma.admin.findMany();
  }

  async getAdmin(id: string): Promise<IAdmin | null> {
    try {
      return await this.getAdminById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateAdmin(id: string, newAdmin: RegisterAdminDto): Promise<void> {
    try {
      await this.getAdminById(id);
      await this.prisma.admin.update({
        where: { id },
        data: newAdmin,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteAdmin(id: string): Promise<void> {
    try {
      await this.getAdminById(id);
      await this.prisma.admin.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
  private async getAdminById(id: string): Promise<IAdmin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });
    if (admin === null) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }
}
