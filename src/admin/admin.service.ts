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
    return this.getAdminById(id);
  }

  async updateAdmin(id: string, newAdmin: RegisterAdminDto): Promise<void> {
    this.getAdminById(id);
    await this.prisma.admin.update({
      where: { id },
      data: newAdmin,
    });
  }

  async deleteAdmin(id: string): Promise<void> {
    this.getAdminById(id);
    await this.prisma.admin.delete({
      where: { id },
    });
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
