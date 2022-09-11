import { prisma } from "../database.js";
import { cards } from "@prisma/client";

export type TypeNewCard = Omit<cards, "id">;

export async function addCardToDatabase(newCard: TypeNewCard) {
  await prisma.cards.create({ data: newCard });
}

export async function getAllCards(owner_id: number) {
  return await prisma.cards.findMany({ where: { owner_id } });
}

export async function getCardById(id: number) {
  return await prisma.cards.findUnique({ where: { id } });
}

export async function deleteCard(id: number) {
  return await prisma.cards.delete({ where: { id } });
}

export async function getCardByName(owner_id: number, title: string) {
  return await prisma.cards.findMany({ where: { owner_id, title } });
}
