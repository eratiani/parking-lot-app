/*
  Warnings:

  - Added the required column `userId` to the `ParkingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingHistory" ADD COLUMN     "userId" TEXT NOT NULL;
