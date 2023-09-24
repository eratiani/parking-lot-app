import { checkedInCar, checkedOutCar } from 'src/car/carDto/car.interface';

export interface IParkingHistory {
  currParkingHistory: checkedInCar[];
  expiredParkingHistory: checkedOutCar[];
}
export interface ICreateParkingLot {
  lotName: string;
  lotAdress: string;
  parkingPrice: number;
  parkingHistory: IParkingHistory;
}
export interface Iparking extends ICreateParkingLot {
  id: string;
}
