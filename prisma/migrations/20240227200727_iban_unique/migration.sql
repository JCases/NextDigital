/*
  Warnings:

  - A unique constraint covering the columns `[IBAN]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_IBAN_key" ON "Account"("IBAN");
