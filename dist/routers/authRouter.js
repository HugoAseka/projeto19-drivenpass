import { Router } from "express";
import * as authController from "../controllers/authController.js";
import validateObj from "../middlewares/validate.js";
import authSchema from "../schemas/authSchema.js";
var authRoute = Router();
authRoute.post("/cadastrar", validateObj(authSchema), authController.signUp);
authRoute.post("/login", validateObj(authSchema), authController.signIn);
export default authRoute;
