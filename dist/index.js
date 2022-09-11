import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import router from "../src/routers/indexRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
var app = express();
dotenv.config();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);
app.listen(process.env.PORT, function () {
    return console.log("RODANDO NA PORTA ".concat(process.env.PORT));
});

