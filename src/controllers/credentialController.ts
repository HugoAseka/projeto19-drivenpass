import * as credentialService from "../services/credentialService.js";
import { Request, Response } from "express";

export async function createCredential(req: Request, res: Response) {
  const {id: owner_id} = res.locals.tokenDecoded;
  const data = req.body;

  await credentialService.createCredential({ ...data, owner_id });
  res.sendStatus(201);
}
