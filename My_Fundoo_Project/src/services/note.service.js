import Note from '../models/note.model';





//create new note

export const newnote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//get all note

export const getAllNotes = async (UserID) => {
  const data = await Note.find({UserID : UserID});
  return data;
};

//get one note by id

export const getOneNote = async (id) => {
  const data = await Note.findById(id);
  if(data != null){
    return data;
  }
  else{
    throw new Error("Invalid ID");
  }
  
};

//Update note ######################

export const UpdateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body, 
    {
      new: true
    }
    );
    if(data != null){
      return data;
    }
    else{
      throw new Error("Invalid ID");
    }
  
};

// Delete Note #############

export const deleteNote = async (id) => {
  const data = await Note.findById(id);
  if(data!=null){
  await Note.findByIdAndDelete(id);
  return " " ;
  }else
  {
    throw new Error("Invalid ID");
  }
};

// Archive note #############

export const noteArchive= async(id)=>{
  const data = await Note.findById(id);
  // console.log("This Is The archive status before archive: ",data);
  if(data!= null){
    // console.log("This is for note.service id : ",id);
    const updateData = await Note.findOneAndUpdate({ _id : id }, {isArchived : true}, {new : true});
    // console.log("This Is The archive status after archive: ",updateData);
    return updateData ;
  }else
  {
    throw new Error("Invalid ID");
  }
};

// Is their any requirment to handel error for invalid ID ????????

// Trash note #############

export const trash= async(id)=>{
  const data = await Note.findById(id);
  // console.log("This Is The isDeleted status before move to trash: ",data);
  if(data!= null){
    // console.log("This is for note.service id : ",id);
    const updateData = await Note.findOneAndUpdate({ _id : id }, {isDeleted : true}, {new : true});
    // console.log("This Is The IsDeleted status after move to trash: ",updateData);
    return updateData ;
  }else
  {
    throw new Error("Invalid ID");
  }
};