import { Router } from "express";
import authRoute from "./authRouter.js";
var router = Router();
router.use(authRoute);
export default router;
