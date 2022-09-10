import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as authRepository from "../repositories/authRepository.js";
import { ParameterStatusMessage } from "pg-protocol/dist/messages.js";

dotenv.config();

export async function createUser(data: authRepository.TypeNewUser) {
  const existingUser = await authRepository.getUserByEmail(data.email);

  if (existingUser) throw { code: "Conflict", message: "Email já cadastrado!" };

  const encryptedPassword = bcrypt.hashSync(data.password, 10);

  await authRepository.addUserToDatabase({
    name: data.name,
    email: data.email,
    password: encryptedPassword,
  });
}

export async function login(email: string, password: string) {
  const user = await authRepository.getUserByEmail(email);

  if (!user) throw { code: "Not Found", message: "Email não cadastrado." };

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY_TOKEN,
      { expiresIn: "10 days" }
    );
    return token;
  } else {
    throw { code: "Unauthorized", message: "Acesso negado" };
  }
}
