import { NextFunction, Request, Response, Router } from "express";

import cardService from "../services/card";

export class CardRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  public withdrawAmount(req: Request, res: Response, next: NextFunction) {
    const { id, amount, bank } = req.body as {
      id: string;
      amount: number;
      bank: string;
    };
    if (!id || !amount || !bank) return res.json({ error: { code: 400 } });
    cardService
      .withdrawAmount(id, amount, bank)
      .then((r) => res.json(r))
      .catch(next);
  }

  public depositAmount(req: Request, res: Response, next: NextFunction) {
    const { id, amount, bank } = req.body as {
      id: string;
      amount: number;
      bank: string;
    };
    if (!id || !amount || !bank) return res.json({ error: { code: 400 } });
    cardService
      .depositAmount(id, amount, bank)
      .then((r) => res.json(r))
      .catch(next);
  }

  public activateCard(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body as { id: string };
    if (!id) return res.json({ error: { code: 400 } });
    cardService
      .activateCard(id)
      .then((r) => res.json(r))
      .catch(next);
  }

  public pinCard(req: Request, res: Response, next: NextFunction) {
    const { id, pin } = req.body as { id: string; pin: string };
    if (!id) return res.json({ error: { code: 400 } });
    cardService
      .pinCard(id, pin)
      .then((r) => res.json(r))
      .catch(next);
  }

  public init() {
    this.router.post("/withdraw", this.withdrawAmount);
    this.router.post("/depositAmount", this.depositAmount);
  }
}

const cardRouter = new CardRouter();
export default cardRouter.router;
