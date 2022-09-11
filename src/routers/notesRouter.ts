import { Router } from "express";
import validateObj from "../middlewares/validate.js";
import noteSchema from "../schemas/noteSchema.js";
import * as notesController from "../controllers/notesController.js";
import validateToken from "../middlewares/validateToken.js";

const notesRouter = Router();

notesRouter.post(
  "/notas",
  validateToken,
  validateObj(noteSchema),
  notesController.createCredential
);
notesRouter.get("/notas", validateToken, notesController.getAllNotes);
notesRouter.get("/notas/:id",validateToken,notesController.getNoteById);



export default notesRouter;
