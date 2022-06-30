import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';



const noteRouter = express.Router();

//route to create a new note

noteRouter.post('/',newNoteValidator,userAuth,noteController.newNote );

//route to get all note

noteRouter.get('/',userAuth,noteController.getAllNote)

//route to get one note

noteRouter.get("/:_id",userAuth,noteController.getOneNote)

//route to update note

noteRouter.put("/:_id",userAuth,noteController.UpdateNote)

// Delete Note ##############

noteRouter.delete("/:_id",userAuth,noteController.deleteNote)

export default noteRouter;

