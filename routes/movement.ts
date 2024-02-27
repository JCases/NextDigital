import { NextFunction, Request, Response, Router } from "express";

import movementService from "../services/movement";

export class MovementRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  public getMovements(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body as { id: string };
    if (!id) return res.json({ error: { code: 400 } });
    movementService
      .getMovements(id)
      .then((r) => res.json(r))
      .catch(next);
  }

  public init() {
    this.router.post("/", this.getMovements);
  }
}

const movementRouter = new MovementRouter();
export default movementRouter.router;
