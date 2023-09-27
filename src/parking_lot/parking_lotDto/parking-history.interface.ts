import { ICar } from 'src/car/carDto';
import { Iparking } from './parking.interface';

export interface ICarParked {
  carParkedId: string;
  parkingId: string;
  checkInTime: Date;
  carId: string;
  car?: ICar;
  parkingLot?: Iparking;
}
