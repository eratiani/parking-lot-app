import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserHistoryService } from './user-history.service';
import { checkedOutCar } from 'src/car/carDto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user-history')
export class UserHistoryController {
  constructor(public readonly userHistoryService: UserHistoryService) {}
  @Post()
  addHistory(@Body() body: checkedOutCar) {
    this.userHistoryService.addHistory(body, body.userId);
    return body.userId;
  }
  @UseGuards(JwtGuard)
  @Get(':userId')
  getHistory(@Param() userId: string) {
    this.userHistoryService.findHistorybyId(userId);
    return null;
  }
}
