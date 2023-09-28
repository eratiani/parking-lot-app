import { Module } from '@nestjs/common';
import { ParckedCarController } from './parcked-car.controller';
import { ParckedCarService } from './parcked-car.service';
import { ParkingLotModule } from 'src/parking_lot/parking_lot.module';

@Module({
  controllers: [ParckedCarController],
  providers: [ParckedCarService],
  imports: [ParkingLotModule],
})
export class ParckedCarModule {}
