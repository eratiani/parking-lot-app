import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserHistoryService } from './user-history.service';
import { checkedOutCar } from 'src/car/carDto';

@Controller('user-history')
export class UserHistoryController {
  constructor(public readonly userHistoryService: UserHistoryService) {}
  @Post()
  addHistory(@Body() body: checkedOutCar) {
    this.userHistoryService.addHistory(body, body.userId);
    return body.userId;
  }
  @Get(':userId')
  getHistory(@Param() userId: string) {
    this.userHistoryService.findHistorybyId(userId);
    return null;
  }
}
