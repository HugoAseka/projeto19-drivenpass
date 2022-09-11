import * as cardService from "../services/cardService.js";
import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
  const data = req.body;
  const { id: owner_id } = res.locals.decodedToken;
  data.expiration_date = new Date(data.expiration_date);
  await cardService.createCard({ ...data, owner_id });
  res.sendStatus(201);
}
