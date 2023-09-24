import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParkingLotDto, Iparking } from './parking_lotDto';
import { v4 as uuidv4 } from 'uuid';
import { ICar } from 'src/car/carDto';
import { checkedInCar } from 'src/car/carDto/car.interface';

@Injectable()
export class ParkingLotService {
  parkingLots: Iparking[] = [];
  addParkingLot(parkingLot: CreateParkingLotDto) {
    const parkingLotId = uuidv4();
    const newparkingLot = {
      ...new CreateParkingLotDto(
        parkingLot.lotName,
        parkingLot.lotAdress,
        parkingLot.parkingPrice,
        parkingLot.parkingHistory,
      ),
      id: parkingLotId,
    };
    this.parkingLots.push(newparkingLot);
    return parkingLotId;
  }
  getParkingLots() {
    return [...this.parkingLots];
  }
  getParkingLot(id: string) {
    const parkingLot = this.findParkingLot(id)[0];
    return { ...parkingLot };
  }
  updateParkingLot(id: string, body: Iparking) {
    const [parkingLot, index] = this.findParkingLot(id);
    this.parkingLots[index] = { ...parkingLot, ...body };
  }
  deleteParkingLot(id: string) {
    const [_, index] = this.findParkingLot(id);
    this.parkingLots.splice(index, 1);
  }
  findParkingLot(id: string): [Iparking, number] {
    const parkingLotIndex = this.parkingLots.findIndex(
      (parkingLot) => parkingLot.id === id,
    );
    const parkingLot = this.parkingLots[parkingLotIndex];
    if (!parkingLot) throw new NotFoundException('could not find lot');
    return [parkingLot, parkingLotIndex];
  }

  checkForUnique(name: string, adress: string) {
    const isNotUnique = this.parkingLots.find(
      (lot) => lot.lotName === name || lot.lotAdress === adress,
    );
    if (isNotUnique)
      throw new ConflictException(
        'lot with the same name or adress already exists.',
      );
  }

  addCarToLot(car: checkedInCar, id: string) {
    const [lot, _] = this.findParkingLot(id);

    lot.parkingHistory.currParkingHistory.push(car);
    return car.carId;
  }
  removeCarFromLot(lotId: string, carId: string, date: Date) {
    const [lot, _] = this.findParkingLot(lotId);
    console.log(lot);
    const [car, carIndex] = this.findCarInLot(lot, carId);
    const fee = this.calculateFee(car.checkInTime, date, lot.parkingPrice);
    const newCar = { ...car, checkOutTime: date, fee: fee };
    lot.parkingHistory.currParkingHistory.splice(carIndex, 1);
    lot.parkingHistory.expiredParkingHistory.push(newCar);
    return [newCar, fee];
  }
  getCurrParkingHistory(parkingLotID: string) {
    return this.findParkingLot(parkingLotID)[0].parkingHistory
      .currParkingHistory;
  }
  getexpiredParkingHistory(parkingLotID: string) {
    return this.findParkingLot(parkingLotID)[0].parkingHistory
      .expiredParkingHistory;
  }
  checkIn(car: ICar, lotId: string) {
    const currDate = new Date();
    const newCar = { ...car, checkInTime: currDate };
    this.addCarToLot(newCar, lotId);
  }
  checkOut(lotId: string, carId: string) {
    const checklOutDate = new Date();
    const [car, fee] = this.removeCarFromLot(lotId, carId, checklOutDate);
    ////implement later add car too history, subtract fee from user
  }
  calculateFee(enterDate: Date, leaveDate: Date, feeMulty: number): number {
    const fee =
      ((leaveDate.getTime() - enterDate.getTime()) / (1000 * 60 * 60)) *
      feeMulty;
    return fee;
  }

  findCarInLot(lot: Iparking, carId: string): [checkedInCar, number] {
    const carIndex = lot.parkingHistory.currParkingHistory.findIndex(
      (lot) => lot.carId === carId,
    );
    const car = lot.parkingHistory.currParkingHistory[carIndex];
    if (!car) throw new NotFoundException('could not find car');
    return [car, carIndex];
  }
}
