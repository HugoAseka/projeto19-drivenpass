import { Request, Response } from "express";
import * as wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {
  const data = req.body;
  const { id: owner_id } = res.locals.decodedToken;
  await wifiService.createWifi({ ...data, owner_id });
  res.sendStatus(201);
}
