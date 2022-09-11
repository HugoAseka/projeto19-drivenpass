import { credentials } from "@prisma/client";
import { prisma } from "../database.js";

export type TypeNewCredential = Omit<credentials, "id">;

export async function addCredentialToDatabase(
  newCredential: TypeNewCredential
) {
  await prisma.credentials.create({ data: newCredential });
}

export async function getUserCredentialByName(name: string, owner_id: number) {
  return await prisma.credentials.findMany({ where: { name, owner_id } });
}

export async function getAllUserCredential(userId: number) {
  return await prisma.credentials.findMany({ where: { owner_id: userId } });
}

export async function getCredentialById(id: number) {
  return await prisma.credentials.findUnique({ where: { id } });
}

export async function deleteCredentialById(id: number) {
  await prisma.credentials.delete({ where: { id } });
}
