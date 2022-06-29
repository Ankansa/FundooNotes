import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';



const noteRouter = express.Router();

//route to create a new note

noteRouter.post('/',userAuth,newNoteValidator,noteController.newNote );

//route to get all note

noteRouter.get('/',userAuth,noteController.getAllNote)

//route to get one note

noteRouter.get("/:_id",userAuth,noteController.getOneNote)

export default noteRouter;

