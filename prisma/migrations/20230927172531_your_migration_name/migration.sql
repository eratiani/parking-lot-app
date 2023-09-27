/*
  Warnings:

  - A unique constraint covering the columns `[parkingId]` on the table `ParkingLot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lotName]` on the table `ParkingLot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lotAddress]` on the table `ParkingLot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_parkingId_key" ON "ParkingLot"("parkingId");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_lotName_key" ON "ParkingLot"("lotName");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_lotAddress_key" ON "ParkingLot"("lotAddress");
