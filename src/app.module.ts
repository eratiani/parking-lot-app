import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CarModule } from './car/car.module';
import { ParkingLotModule } from './parking_lot/parking_lot.module';

@Module({
  imports: [UserModule, AuthModule, AdminModule, CarModule, ParkingLotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
