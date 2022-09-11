import { Router } from "express";
import authRoute from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";
import notesRouter from "./notesRouter.js";
const router = Router();

router.use(authRoute, credentialRouter, notesRouter);

export default router;
