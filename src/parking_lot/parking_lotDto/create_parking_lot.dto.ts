import { ICarParked } from './parking-history.interface';
import { IParkingHistory } from './parking.interface';

export class CreateParkingLotDto {
  constructor(
    public lotName: string,
    public lotAddress: string,
    public parkingPrice: number,
  ) {}
}
