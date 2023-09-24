import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto, ICar } from './carDto';

@Injectable()
export class CarService {
  constructor(public readonly userService: UserService) {}
  addCar(userId: string, car: CreateCarDto) {
    const user = this.userService.findUser(userId)[0];
    const carId = uuidv4();
    const newCar = { ...car, carId: carId, userId: userId };
    user.cars.push(newCar);
    return carId;
  }
  getCars(userId: string) {
    return [...this.userService.getUser(userId).cars];
  }
  getCar(userId: string, carId: string) {
    const [cars, index] = this.findCars(userId, carId);
    return cars[index];
  }
  updateCar(userId: string, CarId: string, body: ICar) {
    const [cars, index] = this.findCars(userId, CarId);
    cars[index] = { ...cars[index], ...body };
  }
  deleteCar(userId: string, carId: string) {
    const [cars, index] = this.findCars(userId, carId);
    cars.splice(index, 1);
  }
  private findCars(userId: string, carId: string): [ICar[], number] {
    const user = this.userService.findUser(userId)[0];
    const carIndex = user.cars.findIndex((car) => car.carId === carId);
    return [user.cars, carIndex];
  }
}
