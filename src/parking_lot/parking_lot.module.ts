import { Module } from '@nestjs/common';
import { ParkingLotService } from './parking_lot.service';
import { ParkingLotController } from './parking_lot.controller';
import { UserBalanceModule } from 'src/user-balance/user-balance.module';
import { UserHistoryModule } from 'src/user-history/user-history.module';

@Module({
  providers: [ParkingLotService],
  controllers: [ParkingLotController],
  imports: [UserBalanceModule, UserHistoryModule],
})
export class ParkingLotModule {}
