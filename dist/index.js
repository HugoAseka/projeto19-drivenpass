import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/indexRouter";
var app = express();
dotenv.config();
app.use(cors());
app.use(json());
app.use(router);
app.listen(process.env.PORT, function () {
    return console.log("RODANDO NA PORTA ".concat(process.env.PORT));
});
