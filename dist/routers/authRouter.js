import { Router } from "express";
import * as authController from "../controllers/authController";
var authRoute = Router();
authRoute.get("/teste", authController.signIn);
export default authRoute;
