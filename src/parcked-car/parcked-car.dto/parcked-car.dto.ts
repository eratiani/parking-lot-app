export class CreateParckedCarDto {
  constructor(
    public checkInTime: Date,
    public carId: string,
    public carParkedId: string,
    public parkingId: string,
  ) {}
}
