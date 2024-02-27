import { Router } from "express";

import MovementRouter from "./movement";
import CardRouter from "./card";
import AccountRouter from "./account";

const router = Router();
router.use("/movements", MovementRouter);
router.use("/cards", CardRouter);
router.use("/accounts", AccountRouter);

export default router;
