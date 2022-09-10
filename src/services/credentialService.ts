import * as credentialRepository from "../repositories/credentialRepository.js";
import Cryptr from "cryptr";

export async function createCredential(
  data: credentialRepository.TypeNewCredential
) {
  const cryptr = new Cryptr(process.env.SECRET);

  await nameCheck(data.owner_id, data.name);

  await credentialRepository.addCredentialToDatabase({
    ...data,
    password: cryptr.encrypt(data.password),
  });
}

async function nameCheck(owner_id: number, name: string) {
  const credential = await credentialRepository.getUserCredentialByName(
    name,
    owner_id
  );

  if (credential.length !== 0) {
    throw {
      code: "Conflict",
      message:
        "Nome já cadastrado. Escolha um novo nome ou apague o outro registro.",
    };
  }
}
