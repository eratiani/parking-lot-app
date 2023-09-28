import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(login: string, pass: string) {
    try {
      const user = await this.userService.getUserByEmail(login);

      if (
        user.password === pass
        // await bcrypt.compare(pass, user.password)
      ) {
        const { password, ...result } = user;
        return result;
      } else {
        return null;
      }
    } catch (error) {}
  }
  async logIn(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.logIn,
      },
    };

    return {
      ...user,
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      accessToken: this.jwtService.sign(payload),
    };
  }
  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.logIn,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
