export class CreateParckedCarDto {
  constructor(
    public checkInTime: Date,
    public carId: string,
    public carParkedId: String,
    public parkingId: String,
  ) {}
}
