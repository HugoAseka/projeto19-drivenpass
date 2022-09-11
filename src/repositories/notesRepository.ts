import { prisma } from "../database.js";
import { secure_notes } from "@prisma/client";

export type TypeNewNote = Omit<secure_notes, "id">;

export async function addNoteToDatabase(newSecure_notes: TypeNewNote) {
  await prisma.secure_notes.create({ data: newSecure_notes });
}

export async function getAllUserNotes(owner_id: number) {
  return await prisma.secure_notes.findMany({ where: { owner_id } });
}

export async function getNoteById(id: number) {
  return await prisma.secure_notes.findUnique({ where: { id } });
}

export async function deleteNote(id: number) {
  return await prisma.secure_notes.delete({ where: { id } });
}

export async function getNoteByName(owner_id: number, title: string) {
  return await prisma.secure_notes.findMany({ where: { title, owner_id } });
}
