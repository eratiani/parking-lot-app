import { ICarParked } from './parking-history.interface';

export interface IParkingHistory extends ICarParked {
  fee: number;
  checkOutTime: Date;
}
