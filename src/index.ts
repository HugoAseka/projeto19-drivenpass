import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../src/routers/indexRouter.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(json());
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`RODANDO NA PORTA ${process.env.PORT}`)
);
