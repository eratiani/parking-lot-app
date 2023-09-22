import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAdminDto, IAdmin } from './adminDto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdminService {
  admins: IAdmin[] = [];
  registerAdmin(admin: RegisterAdminDto): string {
    const adminId = uuidv4();
    const newAdmin = { ...admin, id: adminId };
    this.admins.push(newAdmin);
    return adminId;
  }
  getAdmins() {
    return [...this.admins];
  }
  getAdmin(id: string) {
    const admin = this.findAdmin(id);
    return admin;
  }
  updateAdmin(id: string, newAdmin: IAdmin) {
    const [admin, index] = this.findAdmin(id);
    this.admins[index] = { ...admin, ...newAdmin };
  }
  deleteAdmin(id) {
    const [_, index] = this.findAdmin(id);
    this.admins.splice(index, 1);
  }
  private findAdmin(id: string): [IAdmin, number] {
    const adminIndex = this.admins.findIndex((admin) => admin.id === id);
    const admin = this.admins[adminIndex];
    if (!adminIndex) new NotFoundException('user not found');
    return [admin, adminIndex];
  }
}
