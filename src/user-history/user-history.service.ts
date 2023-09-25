import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserHistory } from './user-historyDto';
import { CreateUserHistoryDto } from './user-historyDto/create-user-history.dto';
import { checkedOutCar } from 'src/car/carDto';

@Injectable()
export class UserHistoryService {
  userHistory: IUserHistory[] = [];
  addHistory(body: checkedOutCar, userId: string) {
    const history = {
      ...new CreateUserHistoryDto({ ...body }),
      userId: userId,
    };
    this.userHistory.push(history);
    return userId;
  }
  getFullHistory() {
    return { ...this.userHistory };
  }

  findHistorybyId(userId: string) {
    const history = this.userHistory.filter(
      (History) => History.userId === userId,
    );
    if (!history) throw new NotFoundException('could not find History');

    return history;
  }
}
