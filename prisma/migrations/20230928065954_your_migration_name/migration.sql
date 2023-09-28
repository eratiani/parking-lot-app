-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "logIn" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "logIn" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "carId" TEXT NOT NULL,
    "carModel" TEXT NOT NULL,
    "carNumber" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("carId")
);

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
    "userId" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Balance" (
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_logIn_key" ON "Admin"("logIn");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_logIn_key" ON "User"("logIn");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_parkingId_key" ON "ParkingLot"("parkingId");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_lotName_key" ON "ParkingLot"("lotName");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_lotAddress_key" ON "ParkingLot"("lotAddress");

-- CreateIndex
CREATE UNIQUE INDEX "CarParked_carParkedId_key" ON "CarParked"("carParkedId");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingHistory_parkingHistoryId_key" ON "ParkingHistory"("parkingHistoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "Balance"("userId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarParked" ADD CONSTRAINT "CarParked_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "ParkingLot"("parkingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingHistory" ADD CONSTRAINT "ParkingHistory_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "ParkingLot"("parkingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
