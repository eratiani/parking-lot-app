import {
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserBalanceService } from './user-balance.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user-balance')
export class UserBalanceController {
  constructor(public readonly userBalanceService: UserBalanceService) {}
  // @UseGuards(JwtGuard)
  @Post(':id')
  async addBalance(@Param('id') id: string) {
    await this.userBalanceService.addBalance(id);
    return null;
  }
  // @UseGuards(JwtGuard)
  @Patch(':id')
  async subtractFromBalance(
    @Param('id') id: string,
    @Query('fee') fee: number,
  ) {
    await this.userBalanceService.subtractFromBalance(id, fee);
    return null;
  }
}
