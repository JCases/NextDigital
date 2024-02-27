import { Router } from "express";

import MovementsRouter from "./movements";

const router = Router();
router.use("/movements", MovementsRouter);

export default router;
