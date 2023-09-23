export interface IAddCar {
  carModel: string;
  carNumber: string;
  carType: string;
}
export interface ICar extends IAddCar {
  carId: string;
}
