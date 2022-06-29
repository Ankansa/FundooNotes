import Note from '../models/note.model';





//create new note

export const newnote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//get all note

export const getAllNotes = async () => {
  const data = await Note.find();
  return data;
};

//get one note by id

export const getOneNote = async (id) => {
  const data = await Note.findById(id);
  console.log(data);
  if(data != null){
    return data;
  }
  else{
    throw new Error("Invalid ID");
  }
  
};