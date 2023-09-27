/*
  Warnings:

  - A unique constraint covering the columns `[parkingId]` on the table `CarParked` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CarParked" DROP CONSTRAINT "CarParked_carId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingHistory" DROP CONSTRAINT "ParkingHistory_carId_fkey";

-- DropIndex
DROP INDEX "CarParked_carId_key";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "carParkedId" TEXT;

-- AlterTable
ALTER TABLE "CarParked" ALTER COLUMN "carId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CarParked_parkingId_key" ON "CarParked"("parkingId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carParkedId_fkey" FOREIGN KEY ("carParkedId") REFERENCES "CarParked"("carParkedId") ON DELETE SET NULL ON UPDATE CASCADE;
