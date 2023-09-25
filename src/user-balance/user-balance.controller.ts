import { Controller, Param, Patch, Post, Query } from '@nestjs/common';

import { UserBalanceService } from './user-balance.service';

@Controller('user-balance')
export class UserBalanceController {
  constructor(public readonly userBalanceService: UserBalanceService) {}
  @Post(':id')
  addBalance(@Param('id') id: string) {
    this.userBalanceService.addBalance(id);
    return null;
  }
  @Patch(':id')
  subtractFromBalance(@Param('id') id: string, @Query('fee') fee: number) {
    this.userBalanceService.subtractFromBalance(id, fee);
    return null;
  }
}
