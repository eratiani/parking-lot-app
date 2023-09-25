import { checkedOutCar } from 'src/car/carDto';

export interface ICreateUserHistory {
  history: checkedOutCar;
}
export interface IUserHistory extends ICreateUserHistory {
  userId: string;
}
