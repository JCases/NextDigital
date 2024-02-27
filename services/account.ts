import { db } from "../utils/prisma";

export class AccountService {
  public async transfersAmount(
    id: string,
    IBAN: string,
    amount: number,
    bank: string
  ) {
    const account = await db.account.findUnique({
      where: { id },
      include: { client: true },
    });

    // TODO: Check IBAN or: return;

    await db.account.update({
      where: { id },
      data: {
        amount: account!.amount - amount,
      },
    });

    if (bank !== account!.client.bank) console.log("Commission!");

    await db.movements.create({
      data: { accountId: account!.id, amount: -amount, type: "transfer" },
    });

    await db.account.update({
      where: { IBAN },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    await db.movements.create({
      data: { account: { connect: { IBAN } }, amount, type: "transfer" },
    });
  }
}

const accountService = new AccountService();
export default accountService;
