import * as cardService from "../services/cardService.js";
import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
  const data = req.body;
  const { id: owner_id } = res.locals.decodedToken;
  data.expiration_date = new Date(data.expiration_date);
  await cardService.createCard({ ...data, owner_id });
  res.sendStatus(201);
}

export async function getAllCards(req: Request, res: Response) {
  const { id } = res.locals.decodedToken;
  const cards = await cardService.getAllCards(id);
  res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response) {
  const { id: owner_id } = res.locals.decodedToken;
  const { id: cardId } = req.params;
  const card = await cardService.getCardById(Number(cardId), owner_id);
  res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
  const { id: owner_id } = res.locals.decodedToken;
  const { id: cardId } = req.params;
  await cardService.deleteCard(Number(cardId), owner_id);
  res.sendStatus(202);
}
