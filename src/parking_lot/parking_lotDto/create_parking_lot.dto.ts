import { IParkingHistory, ICreateParkingLot } from './parking.interface';

export class CreateParkingLotDto implements ICreateParkingLot {
  constructor(
    public lotName: string,
    public lotAdress: string,
    public parkingPrice: number,
    public parkingHistory: IParkingHistory = {
      currParkingHistory: [],
      expiredParkingHistory: [],
    },
  ) {}
}
