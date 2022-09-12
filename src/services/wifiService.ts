import * as wifiRepository from "../repositories/wifiRepository.js";
import Cryptr from "cryptr";

export async function createWifi(newWifi: wifiRepository.TypeNewWifi) {
  const cryptr = new Cryptr(process.env.SECRET);
  await checkWifiName(newWifi.owner_id, newWifi.name);
  await wifiRepository.addWifiToDatabase({
    ...newWifi,
    password: cryptr.encrypt(newWifi.password),
  });
}

async function checkWifiName(owner_id: number, name: string) {
  const wifi = await wifiRepository.getWifiByName(owner_id, name);
  if (wifi.length !== 0)
    throw { code: "Conflict", message: "Nome já está em uso." };
}

export async function getAllWifis(owner_id: number) {
  const cryptr = new Cryptr(process.env.SECRET);
  const wifis = await wifiRepository.getAllWifis(owner_id);
  const data = wifis.map((el) => {
    return {
      id: el.id,
      name: el.name,
      network: el.network,
      password: cryptr.decrypt(el.password),
    };
  });
  return { wifis: data };
}

export async function getWifiById(owner_id: number, wifiId: number) {
  const cryptr = new Cryptr(process.env.SECRET);
  return await checkWifiById(owner_id, wifiId);
}

async function checkWifiById(owner_id: number, wifiId: number) {
  const wifi = await wifiRepository.getWifiById(wifiId);
  if (!wifi) throw { code: "NotFound", message: "Wifi não encontrado." };
  if (wifi.owner_id !== owner_id)
    throw { code: "Unauthorized", message: "Wifi não pertence ao usuário." };
  return wifi;
}
