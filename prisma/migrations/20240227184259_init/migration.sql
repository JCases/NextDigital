-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "IBAN" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Account_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "pin" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Movements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Movements_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_accountId_key" ON "Card"("accountId");
