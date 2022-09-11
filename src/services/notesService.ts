import * as noteRepository from "../repositories/notesRepository.js";

export async function createNote(data: noteRepository.TypeNewNote) {
  await getNoteByName(data.owner_id, data.title);
  await noteRepository.addNoteToDatabase({ ...data });
}

async function getNoteByName(owner_id: number, name: string) {
  const note = await noteRepository.getNoteByName(owner_id, name);

  if (note.length !== 0)
    throw { code: "Conflict", message: "Já existe uma nota com esse nome." };
}

async function getNoteById(noteId: number, owner_id: number) {
  const note = await noteRepository.getNoteById(noteId);

  if (!note) throw { code: "NotFound", message: "Nota não existe." };
  if (note.owner_id !== owner_id)
    throw { code: "Unauthorized", message: "Nota não pertence ao usuário." };

  return note;
}
