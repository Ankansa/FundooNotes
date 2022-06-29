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
    
// get All Note##############

export const getAllNote = async ( req, res, next) =>{
  try {
        const data = await NoteService.getAllNotes();
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'All notes fetched successfully'
        });
      } catch (error) {
        next(error);
      }
    };


    // get one Note##############

export const getOneNote = async ( req, res, next) =>{
  try {
        const data = await NoteService.getOneNote(req.params._id);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Note fetched successfully'
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });
      }
    };