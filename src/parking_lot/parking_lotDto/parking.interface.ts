import { ICar } from 'src/car/carDto';

export interface IParkingHistory {
  currParkingHistory: ICar[];
  expiredParkingHistory: ICar[];
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
