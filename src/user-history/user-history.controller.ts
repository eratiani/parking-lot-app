import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserHistoryService } from './user-history.service';

@Controller('user-history')
export class UserHistoryController {
  constructor(public readonly userHistoryService: UserHistoryService) {}

  @Get(':lotId/lot')
  async getHistory(@Param('lotId') lotId: string) {
    try {
      return await this.userHistoryService.getHistoryByLot(lotId);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtGuard)
  @Get(':userId/user')
  async getHistorybyUser(@Param('userId') userId: string) {
    try {
      return await this.userHistoryService.getHistoryByUserId(userId);
    } catch (error) {
      throw error;
    }
  }
}
