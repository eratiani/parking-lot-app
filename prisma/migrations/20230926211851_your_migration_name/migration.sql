/*
  Warnings:

  - Added the required column `balance` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Car" (
    "carId" TEXT NOT NULL,
    "carModel" TEXT NOT NULL,
    "carNumber" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("carId")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
