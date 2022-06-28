import Note from '../models/note.model';





//create new note

export const newnote = async (body) => {
  const data = await Note.create(body);
  return data;
};

