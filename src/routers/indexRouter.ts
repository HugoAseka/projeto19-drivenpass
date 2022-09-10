import { Router } from "express";
import authRoute from "./authRouter.js";
import credentialRouter from "./credentialRoute.js";
const router = Router();

router.use(authRoute, credentialRouter);

export default router;
