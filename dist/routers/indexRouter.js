import { Router } from "express";
import authRoute from "./authRouter";
var router = Router();
router.use(authRoute);
export default router;
