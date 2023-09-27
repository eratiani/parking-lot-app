import { Controller, Param, Patch, Post, Query } from '@nestjs/common';

import { UserBalanceService } from './user-balance.service';

@Controller('user-balance')
export class UserBalanceController {
  constructor(public readonly userBalanceService: UserBalanceService) {}
  @Post(':id')
  async addBalance(@Param('id') id: string) {
    await this.userBalanceService.addBalance(id);
    return null;
  }
  @Patch(':id')
  async subtractFromBalance(
    @Param('id') id: string,
    @Query('fee') fee: number,
  ) {
    await this.userBalanceService.subtractFromBalance(id, fee);
    return null;
  }
}
