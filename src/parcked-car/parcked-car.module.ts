import { Module } from '@nestjs/common';
import { ParckedCarController } from './parcked-car.controller';
import { ParckedCarService } from './parcked-car.service';

@Module({
  controllers: [ParckedCarController],
  providers: [ParckedCarService],
  exports: [ParckedCarService],
})
export class ParckedCarModule {}
