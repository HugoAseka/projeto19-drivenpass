import * as noteRepository from "../repositories/notesRepository.js";

export async function createNote(data: noteRepository.TypeNewNote) {
  await getNoteByName(data.owner_id, data.title);
  await noteRepository.addNoteToDatabase({ ...data });
}

export async function getAllNotes(owner_id: number) {
  const notes = await noteRepository.getAllUserNotes(owner_id);
  const data = notes.map((el, ind) => {
    return {
      id: el.id,
      title: el.title,
      anotation: el.anotation,
    };
  });
  return { notes: data };
}

async function getNoteByName(owner_id: number, name: string) {
  const note = await noteRepository.getNoteByName(owner_id, name);

  if (note.length !== 0)
    throw { code: "Conflict", message: "Já existe uma nota com esse nome." };
}

export async function getNoteById(noteId: number, owner_id: number) {
  const note = await noteRepository.getNoteById(noteId);

  if (!note) throw { code: "NotFound", message: "Nota não existe." };
  if (note.owner_id !== owner_id)
    throw { code: "Unauthorized", message: "Nota não pertence ao usuário." };

  return { ...note };
}

export async function deleteNote(noteId: number, owner_id: number) {
  await getNoteById(noteId, owner_id);
  await noteRepository.deleteNote(noteId);
}
