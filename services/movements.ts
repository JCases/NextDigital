import { db } from "../utils/prisma";
import "./utils/prisma";

class MovementsService {
  public async getMovements(id: string, accountId: string) {
    const movements = await db.card.findMany({
      where: { id: id, account: { id: accountId } },
    });
    return movements;
  }
}

const movementsService = new MovementsService();
export default movementsService;
