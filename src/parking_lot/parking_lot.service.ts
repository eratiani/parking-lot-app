import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParkingLotDto, Iparking } from './parking_lotDto';
import { v4 as uuidv4 } from 'uuid';

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
    if (!parkingLot) throw new NotFoundException('could not find user');
    return [parkingLot, parkingLotIndex];
  }
}
