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

export async function getAllUserCredential(userId: number) {
  const cryptr = new Cryptr(process.env.SECRET);
  const encryptedCredentials = await credentialRepository.getAllUserCredential(
    userId
  );

  const credentials = encryptedCredentials.map((credential) => {
    return {
      id: credential.id,
      name: credential.name,
      url: credential.url,
      username: credential.username,
      password: cryptr.decrypt(credential.password),
    };
  });

  return credentials;
}

export async function getUserCredentialById(id: number, owner_id: number) {
  const cryptr = new Cryptr(process.env.SECRET);

  const credential = await getCredential(id, owner_id);

  return { ...credential, password: cryptr.decrypt(credential.password) };
}

async function getCredential(credentialId: number, owner_id: number) {
  const credential = await credentialRepository.getCredentialById(credentialId);
  console.log(credential)
  if (!credential)
    throw { code: "NotFound", message: "Credencial não existe." };
  if (credential.owner_id !== owner_id)
    throw {
      code: "Unauthorized",
      message: "Credencial não pertence ao usuário.",
    };
  return credential;
}
