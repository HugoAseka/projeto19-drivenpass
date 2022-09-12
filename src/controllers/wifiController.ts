import { Request, Response } from "express";
import * as wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {
  const data = req.body;
  const { id: owner_id } = res.locals.decodedToken;
  await wifiService.createWifi({ ...data, owner_id });
  res.sendStatus(201);
}

export async function getAllWifis(req: Request, res: Response) {
  const { id: owner_id } = res.locals.decodedToken;
  const wifis = await wifiService.getAllWifis(owner_id);
  res.status(200).send(wifis);
}

export async function getWifiById(req: Request, res: Response) {
  const { id: owner_id } = res.locals.decodedToken;
  const { id: wifiId } = req.params;
  const wifi = await wifiService.getWifiById(owner_id, Number(wifiId));
  res.status(200).send(wifi);
}
