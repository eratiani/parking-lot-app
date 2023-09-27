/*
  Warnings:

  - A unique constraint covering the columns `[logIn]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_logIn_key" ON "User"("logIn");
