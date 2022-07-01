import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';
// import { user } from '../middlewares/auth.middleware';



//create a new note################

export const newNote = async (req, res, next) => {
      try {
        const data = await NoteService.newnote(req.body);
        // console.log("This is the body on controller : ", req.body);
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
        const data = await NoteService.getAllNotes(req.body.UserID);
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
        const data = await NoteService.getOneNote(req.params._id, req.body.UserID);
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

    // Update note   ##############

export const UpdateNote = async ( req, res, next) =>{
  try {
        const data = await NoteService.UpdateNote(req.params._id, req.body,req.body.UserID);
        console.log("From note control : ", req.body);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Note Updated successfully'
        });
      } catch (error) {
        next(error);
      }
    };

// Delete Note ############

export const deleteNote = async (req, res, next) =>{
  try {
    await NoteService.deleteNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};



// Archive notes ################


export const archive = async(req, res,next) =>{
  try {
    const data = await NoteService.noteArchive(req.params._id);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Note Archive successfully'
        });
  }catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    }); 
  }
};

// In archive any required to handel error ??????????????????????????


// Trash notes ################


export const trash = async(req, res,next) =>{
  try {
    const data = await NoteService.trash(req.params._id);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Note successfully move to Trash'
        });
  }catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    }); 
  }
};