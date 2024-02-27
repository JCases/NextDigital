import { NextFunction, Request, RequestHandler, Response } from "express";

import { db } from "../utils/prisma";

export function validateCard(): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Check Request Data Received
    const id = req.body.id;

    const card = await db.card.findUnique({
      where: { id },
    });

    if (!card!.active) return res.json({ error: { code: 400 } });
  };
}

export default validateCard;
