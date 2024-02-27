import { NextFunction, Request, Response, Router } from "express";

import accountService from "../services/account";

export class AccountRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  public transfersAmount(req: Request, res: Response, next: NextFunction) {
    const { id, IBAN, amount, bank } = req.body as {
      id: string;
      IBAN: string;
      amount: number;
      bank: string;
    };
    if (!id || !IBAN || !amount || !bank)
      return res.json({ error: { code: 400 } });
    accountService
      .transfersAmount(id, IBAN, amount, bank)
      .then((r) => res.json(r))
      .catch(next);
  }

  public init() {
    this.router.post("/transfers", this.transfersAmount);
  }
}

const accountRouter = new AccountRouter();
export default accountRouter.router;
