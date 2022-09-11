import { prisma } from "../database.js";
import { wifis } from "@prisma/client";

export type TypeNewWifi = Omit<wifis, "id">;

export async function addWifiToDatabase(newWifi: TypeNewWifi) {
  await prisma.wifis.create({ data: newWifi });
}

export async function getAllWifis(owner_id: number) {
  return await prisma.wifis.findMany({ where: { owner_id } });
}

export async function getWifiById(id: number) {
  return await prisma.wifis.findUnique({ where: { id } });
}

export async function getWifiByName(owner_id: number, name: string) {
  return await prisma.wifis.findMany({ where: { owner_id, name } });
}

export async function deleteWifi(id: number) {
  await prisma.wifis.delete({ where: { id } });
}
