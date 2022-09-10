import * as credentialController from "../controllers/credentialController.js";
import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateObj from "../middlewares/validate.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post(
  "/credenciais",
  validateToken,
  validateObj(credentialSchema),
  credentialController.createCredential
);

credentialRouter.get(
  "/credenciais",
  validateToken,
  credentialController.getAllUserCredential
);

export default credentialRouter;
