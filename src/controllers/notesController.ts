import * as notesService from "../services/notesService.js";
import { Request, Response } from "express";

export async function createCredential(req: Request, res: Response) {
  const data = req.body;
  const { id: owner_id } = res.locals.decodedToken;

  await notesService.createNote({ ...data, owner_id });

  res.sendStatus(201);
}

export async function getAllNotes(req: Request, res: Response) {
  const { id } = res.locals.decodedToken;
  const notes = await notesService.getAllNotes(id);
  res.status(200).send(notes);
}

export async function getNoteById(req: Request, res: Response) {
  const { id: owner_id } = res.locals.decodedToken;
  const { id: noteId } = req.params;
  const note = await notesService.getNoteById(Number(noteId), owner_id);
  res.status(200).send(note);
}
