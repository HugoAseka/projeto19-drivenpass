import { Router } from "express";
import { signIn } from "../controllers/authController";

const authRoute = Router();

authRoute.get("/teste", signIn);

export default authRoute;
