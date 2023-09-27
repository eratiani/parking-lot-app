export class CreateParkingLotDto {
  constructor(
    public lotName: string,
    public lotAddress: string,
    public parkingPrice: number,
  ) {}
}
