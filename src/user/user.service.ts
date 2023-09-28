import { Injectable, NotFoundException } from '@nestjs/common';

import { IUser, RegisterUserDto } from './userDto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(user: RegisterUserDto): Promise<string> {
    const newUser = await this.prisma.user.create({
      data: {
        logIn: user.logIn,
        password: user.password,
        email: user.email,

        cars: {
          create: user.cars,
        },
      },
    });

    return newUser.id;
  }

  async getUsers(): Promise<IUser[]> {
    return await this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<IUser | null> {
    try {
      return await this.getUserById(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(id: string, newUser: RegisterUserDto): Promise<void> {
    try {
      await this.getUserById(id);
      await this.prisma.user.update({
        where: { id },
        data: {
          logIn: newUser.logIn,
          password: newUser.password,
          email: newUser.email,

          cars: {
            create: newUser.cars,
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.getUserById(id);
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  private async getUserById(id: string): Promise<IUser | null> {
    const User = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!User) {
      throw new NotFoundException('User not found');
    }
    return User;
  }
  async getUserByEmail(email: string): Promise<IUser | null> {
    const User = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!User) {
      throw new NotFoundException('User not found');
    }

    return User;
  }
}
