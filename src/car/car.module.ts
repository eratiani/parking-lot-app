import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [CarService],
  controllers: [CarController],
  imports: [UserModule],
})
export class CarModule {}
