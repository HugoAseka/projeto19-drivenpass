import { Request ,Response } from "express";

export async function signIn(req : Request, res: Response) {
    
    res.send('rodando').status(200);
}