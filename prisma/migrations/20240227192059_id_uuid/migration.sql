/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Movements` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "IBAN" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "Account_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("IBAN", "amount", "clientId", "id") SELECT "IBAN", "amount", "clientId", "id" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "pin" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    CONSTRAINT "Card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("accountId", "active", "credit", "id", "limit", "pin", "type") SELECT "accountId", "active", "credit", "id", "limit", "pin", "type" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_accountId_key" ON "Card"("accountId");
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Client" ("id", "name") SELECT "id", "name" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Movements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    CONSTRAINT "Movements_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movements" ("accountId", "amount", "id", "type") SELECT "accountId", "amount", "id", "type" FROM "Movements";
DROP TABLE "Movements";
ALTER TABLE "new_Movements" RENAME TO "Movements";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
