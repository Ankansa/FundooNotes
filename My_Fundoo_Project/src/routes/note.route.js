import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';



const noteRouter = express.Router();

//route to create a new note

noteRouter.post('/newNote',newNoteValidator,noteController.newNote );

export default noteRouter;

