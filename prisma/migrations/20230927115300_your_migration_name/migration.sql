-- CreateTable
CREATE TABLE "ParkingLot" (
    "parkingId" TEXT NOT NULL,
    "lotName" TEXT NOT NULL,
    "lotAddress" TEXT NOT NULL,
    "parkingPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("parkingId")
);

-- CreateTable
CREATE TABLE "CarParked" (
    "carParkedId" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3) NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "CarParked_pkey" PRIMARY KEY ("carParkedId")
);

-- CreateTable
CREATE TABLE "ParkingHistory" (
    "parkingHistoryId" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3) NOT NULL,
    "checkOutTime" TIMESTAMP(3) NOT NULL,
    "carId" TEXT NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ParkingHistory_pkey" PRIMARY KEY ("parkingHistoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarParked_carId_key" ON "CarParked"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingHistory_carId_key" ON "ParkingHistory"("carId");

-- AddForeignKey
ALTER TABLE "CarParked" ADD CONSTRAINT "CarParked_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarParked" ADD CONSTRAINT "CarParked_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "ParkingLot"("parkingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingHistory" ADD CONSTRAINT "ParkingHistory_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingHistory" ADD CONSTRAINT "ParkingHistory_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "ParkingLot"("parkingId") ON DELETE RESTRICT ON UPDATE CASCADE;
