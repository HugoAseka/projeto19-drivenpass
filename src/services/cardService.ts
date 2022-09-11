import * as cardRepository from "../repositories/cardRepository.js";
import Cryptr from "cryptr";

export async function createCard(data: cardRepository.TypeNewCard) {
  const cryptr = new Cryptr(process.env.SECRET);
  await checkCardByName(data.owner_id, data.title);
  await cardRepository.addCardToDatabase({
    ...data,
    cvc: cryptr.encrypt(data.cvc),
    password: cryptr.encrypt(data.password),
  });
}

async function checkCardByName(owner_id: number, title: string) {
  const card = await cardRepository.getCardByName(owner_id, title);
  if (card.length !== 0)
    throw { code: "Conflict", message: "Nome de cartão já está em uso." };
}

export async function getAllCards(id: number) {
  const cryptr = new Cryptr(process.env.SECRET);
  const cards = await cardRepository.getAllCards(id);
  const data = cards.map((el) => {
    return {
      id: el.id,
      name: el.name,
      number: el.number,
      cvc: cryptr.decrypt(el.cvc),
      expiration_date: el.expiration_date,
      password: cryptr.decrypt(el.password),
      is_virtual: el.is_virtual,
      type: el.type,
    };
  });
  return { cards: data };
}
