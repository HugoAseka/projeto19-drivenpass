import * as cardController from "../controllers/cardController.js";
import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateObj from "../middlewares/validate.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateToken,
  validateObj(cardSchema),
  cardController.createCard
);

export default cardRouter;
