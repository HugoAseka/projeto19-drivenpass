import { Router } from "express";
import * as authController from "../controllers/authController.js";

const authRoute = Router();

authRoute.get("/teste", authController.signIn);

export default authRoute;
