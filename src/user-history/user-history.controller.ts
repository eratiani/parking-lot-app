import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserHistoryService } from './user-history.service';
import { CheckidInCar, checkedOutCar } from 'src/car/carDto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user-history')
export class UserHistoryController {
  constructor(public readonly userHistoryService: UserHistoryService) {}
  // @Post()
  // addHistory(@Body() body: CheckidInCar) {
  //   this.userHistoryService.createHisory(body,price);
  //   return body.userId;
  // }
  // @UseGuards(JwtGuard)
  @Get(':lotId/lot')
  async getHistory(@Param('lotId') lotId: string) {
    return await this.userHistoryService.getHistoryByLot(lotId);
  }
  @Get(':userId/user')
  async getHistorybyUser(@Param('userId') userId: string) {
    return await this.userHistoryService.getHistoryByUserId(userId);
  }
}
