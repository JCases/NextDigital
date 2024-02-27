import { db } from "../utils/prisma";

import bcrypt from "bcrypt";

export class CardService {
  public async withdrawAmount(id: string, amount: number, bank: string) {
    const card = await db.card.findUnique({
      where: { id },
      include: { account: { include: { client: true } } },
    });

    if (card!.type === "debit" && amount > card!.account.amount) return;
    if (
      card!.type === "credit" &&
      (amount > card!.account.amount || amount > card!.credit)
    )
      return;
    if (amount > card!.limit) return;

    await db.card.update({
      where: { id },
      data: {
        account: {
          update: { data: { amount: card!.account.amount - amount } },
        },
      },
    });

    if (bank !== card!.account.client.bank) console.log("Commission!");

    await db.movements.create({
      data: { accountId: card!.accountId, amount: -amount, type: "withdraw" },
    });
  }

  public async depositAmount(id: string, amount: number, bank: string) {
    const card = await db.card.findUnique({
      where: { id },
      include: { account: { include: { client: true } } },
    });

    if (bank !== card!.account.client.bank) return;

    await db.card.update({
      where: { id },
      data: {
        account: {
          update: { data: { amount: card!.account.amount + amount } },
        },
      },
    });

    await db.movements.create({
      data: { accountId: card!.accountId, amount, type: "deposit" },
    });
  }

  public async activateCard(id: string) {
    await db.card.update({
      where: { id },
      data: { active: true },
    });
  }

  public async pinCard(id: string, pin: string) {
    await db.card.update({
      where: { id },
      data: { pin: bcrypt.hashSync(pin, 10) },
    });
  }
}

const cardService = new CardService();
export default cardService;
