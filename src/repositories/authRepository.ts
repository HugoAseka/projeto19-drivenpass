import { prisma } from "../database.js";
import { users } from "@prisma/client";

export type TypeNewUser = Omit<users, "id">;

export async function addUserToDatabase(newUser: TypeNewUser) {
  await prisma.users.create({ data: newUser });
}

export async function getUserByEmail(email: string): Promise<users> {
  return await prisma.users.findUnique({ where: { email } });
}
