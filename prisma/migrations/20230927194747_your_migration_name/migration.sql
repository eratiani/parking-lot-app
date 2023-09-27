/*
  Warnings:

  - A unique constraint covering the columns `[logIn]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_logIn_key" ON "Admin"("logIn");
