import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { CarService } from './car.service';
import { CreateCarDto, ICar } from './carDto';
import { throwCustomError } from 'src/utility/custom.error';
import { checkAllowedFields } from 'src/utility/allowed-fields.error';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user/:userId/cars')
export class CarController extends UserController {
  constructor(
    public readonly userService: UserService,
    public readonly carService: CarService,
  ) {
    super(userService);
  }
  @UseGuards(JwtGuard)
  @Post()
  async addCar(@Body() body: CreateCarDto, @Param('userId') userId: string) {
    throwCustomError(body, 'carModel', 'string');
    throwCustomError(body, 'carNumber', 'string');
    throwCustomError(body, 'carType', 'string');
    checkAllowedFields(['carModel', 'carNumber', 'carType'], body);
    try {
      await this.carService.addCar(userId, body);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtGuard)
  @Get()
  async getCars(@Param('userId') userId: string) {
    try {
      return await this.carService.getCars(userId);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtGuard)
  @Get(':carId')
  async getCar(@Param('carId') carId: string) {
    if (!carId || typeof carId !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    try {
      return await this.carService.getCar(carId);
    } catch (error) {
      throw new HttpException('car does not exist', HttpStatus.NOT_FOUND);
    }
  }
  @UseGuards(JwtGuard)
  @Patch(':carId')
  async updateCar(
    @Param('carId') carId: string,

    @Body() body: ICar,
  ) {
    throwCustomError(body, 'carModel', 'string');
    throwCustomError(body, 'carNumber', 'string');
    throwCustomError(body, 'carType', 'string');
    checkAllowedFields(['carModel', 'carNumber', 'carType', 'carId'], body);
    if (!carId || typeof carId !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    try {
      await this.carService.updateCar(carId, body);
    } catch (error) {
      throw new HttpException('car does not exist', HttpStatus.NOT_FOUND);
    }
    return null;
  }
  @UseGuards(JwtGuard)
  @Delete(':carId')
  async deleteCar(
    @Param('carId') carId: string,
    @Param('userId') userId: string,
  ) {
    if (!carId || typeof carId !== 'string') {
      throw new BadRequestException('Invalid request id');
    }
    try {
      await this.carService.deleteCar(userId, carId);
    } catch (error) {
      throw new HttpException('car does not exist', HttpStatus.NOT_FOUND);
    }
    return null;
  }
}
