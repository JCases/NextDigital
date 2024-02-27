import { NextFunction, Request, Response, Router } from "express";

import movementsService from "../services/movements";

export class MovementsRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  public getMovements(req: Request, res: Response, next: NextFunction) {
    const { id, accountId } = req.body as { id: string; accountId: string };
    if (!id || !accountId) return res.json({ error: { code: 400 } });
    movementsService
      .getMovements(id, accountId)
      .then((r) => res.json(r))
      .catch(next);
  }

  public init() {
    this.router.post("/", this.getMovements);
  }
}

const movementsRouter = new MovementsRouter();
export default movementsRouter.router;
