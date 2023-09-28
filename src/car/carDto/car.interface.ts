export interface IAddCar {
  carModel: string;
  carNumber: string;
  carType: string;
  userId: string;
}
export interface ICar extends IAddCar {
  carId: string;
}
export interface checkedInCar extends ICar {
  checkInTime: Date;
}
export interface checkedOutCar extends checkedInCar {
  checkOutTime: Date;
  fee: number;
  parkingLotId: string;
}
export interface CheckidInCar {
  carParkedId: string;
  parkingId: string;
  checkInTime: Date;
  carId: string;
  userId: string;
}
