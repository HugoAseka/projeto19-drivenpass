import * as wifiController from "../controllers/wifiController.js";
import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateObj from "../middlewares/validate.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post(
  "/wifis",
  validateToken,
  validateObj(wifiSchema),
  wifiController.createWifi
);
wifiRouter.get("/wifis", validateToken, wifiController.getAllWifis);

export default wifiRouter;
