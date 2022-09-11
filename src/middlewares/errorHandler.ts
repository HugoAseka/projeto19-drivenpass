import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  return res.status(400).send(error);
}
