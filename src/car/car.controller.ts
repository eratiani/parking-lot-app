import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { CarService } from './car.service';
import { CreateCarDto, ICar } from './carDto';
import { throwCustomError } from 'src/utility/custom.error';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';

@Controller('user/:userId/cars')
export class CarController extends UserController {
  constructor(
    public readonly userService: UserService,
    public readonly carService: CarService,
  ) {
    super(userService);
  }

  @Post()
  addCar(@Body() body: CreateCarDto, @Param('userId') userId: string) {
    throwCustomError(body, 'carModel', 'string');
    throwCustomError(body, 'carNumber', 'string');
    throwCustomError(body, 'carType', 'string');
    checkAllowedFields(['carModel', 'carNumber', 'carType'], body);
    this.carService.addCar(userId, body);
  }
  @Get()
  getCars(@Param('userId') userId: string) {
    return this.carService.getCars(userId);
  }
  @Get(':carId')
  getCar(@Param('carId') carId: string, @Param('userId') userId: string) {
    if (!carId || typeof carId !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    return this.carService.getCar(userId, carId);
  }
  @Patch(':carId')
  updateCar(
    @Param('carId') carId: string,
    @Param('userId') userId: string,
    @Body() body: ICar,
  ) {
    throwCustomError(body, 'carModel', 'string');
    throwCustomError(body, 'carNumber', 'string');
    throwCustomError(body, 'carType', 'string');
    checkAllowedFields(['carModel', 'carNumber', 'carType', 'carId'], body);
    if (!carId || typeof carId !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    this.carService.updateCar(userId, carId, body);
    return null;
  }
  @Delete(':carId')
  deleteCar(@Param('carId') carId: string, @Param('userId') userId: string) {
    if (!carId || typeof carId !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    this.carService.deleteCar(userId, carId);
    return null;
  }
}
