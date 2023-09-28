/*
  Warnings:

  - You are about to drop the column `carParkedId` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[carParkedId]` on the table `CarParked` will be added. If there are existing duplicate values, this will fail.
  - Made the column `carId` on table `CarParked` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_carParkedId_fkey";

-- DropIndex
DROP INDEX "CarParked_parkingId_key";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "carParkedId";

-- AlterTable
ALTER TABLE "CarParked" ALTER COLUMN "carId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CarParked_carParkedId_key" ON "CarParked"("carParkedId");
