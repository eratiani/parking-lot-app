import { IAddCar } from './car.interface';

export class CreateCarDto implements IAddCar {
  constructor(
    public carModel: string,
    public carNumber: string,
    public carType: string,
  ) {}
}
