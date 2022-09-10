import { Router } from "express";
import * as authController from "../controllers/authController.js";
import validateUser from "../middlewares/validateUserMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRoute = Router();

authRoute.post("/cadastrar",validateUser(authSchema) , authController.signUp);
authRoute.post("/login", validateUser(authSchema), authController.signIn );

export default authRoute;
