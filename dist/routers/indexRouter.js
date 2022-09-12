import { Router } from "express";
import authRoute from "./authRouter.js";
import cardRouter from "./cardRouter.js";
import credentialRouter from "./credentialRouter.js";
import notesRouter from "./notesRouter.js";
import wifiRouter from "./wifiRouter.js";
var router = Router();
router.use(authRoute, credentialRouter, notesRouter, cardRouter, wifiRouter);
export default router;
