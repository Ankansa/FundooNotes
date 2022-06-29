import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';



const noteRouter = express.Router();

//route to create a new note

noteRouter.post('/newnote',userAuth,newNoteValidator,noteController.newNote );

//route to get all note

noteRouter.get("/allnote",userAuth,noteController.getAllNote)

export default noteRouter;

