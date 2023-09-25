import { checkedOutCar } from 'src/car/carDto';
import { ICreateUserHistory } from './user-history.interface';

export class CreateUserHistoryDto implements ICreateUserHistory {
  constructor(public history: checkedOutCar) {}
}
