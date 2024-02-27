import { db } from "../utils/prisma";

export class MovementService {
  public async getMovements(id: string) {
    const movements = await db.movements.findMany({
      where: { account: { id } },
    });
    return movements;
  }
}

const movementService = new MovementService();
export default movementService;
