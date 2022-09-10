import * as credentialService from "../services/credentialService.js";
import { Request, Response } from "express";

export async function createCredential(req: Request, res: Response) {
  const { id: owner_id } = res.locals.decodedToken;
  const data = req.body;

  await credentialService.createCredential({ ...data, owner_id });
  res.sendStatus(201);
}

export async function getAllUserCredential(req: Request, res: Response) {
  const { id: userId } = res.locals.decodedToken;

  const credentials = await credentialService.getAllUserCredential(userId);

  res.status(200).send(credentials);
}
