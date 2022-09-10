import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

function validateToken(req: Request, res: Response, next: NextFunction) {
  const getToken = req.headers["authorization"];
  const token = getToken?.replace("Bearer ", "");

  if (!token) {
    throw {
      code: "Anauthorized",
      message: "Um token é necessario para autenticação",
    };
  }
  try {
    res.locals.tokenDecoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    next();
  } catch (err) {
    return res.status(401).send("Token inválido");
  }
}

export default validateToken;
