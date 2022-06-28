import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';


//create a new note################

export const newNote = async (req, res, next) => {
      try {
        const data = await NoteService.newnote(req.body);
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'Note created successfully'
        });
      } catch (error) {
        next(error);
      }
    };
    
