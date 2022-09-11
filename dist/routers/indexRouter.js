import { Router } from "express";
import authRoute from "./authRouter.js";
import cardRouter from "./cardRouter.js";
import credentialRouter from "./credentialRouter.js";
import notesRouter from "./notesRouter.js";
var router = Router();
router.use(authRoute, credentialRouter, notesRouter, cardRouter);
export default router;
