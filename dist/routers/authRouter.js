import { Router } from "express";
import { signIn } from "../controllers/authController";
var authRoute = Router();
authRoute.get("/teste", signIn);
export default authRoute;
