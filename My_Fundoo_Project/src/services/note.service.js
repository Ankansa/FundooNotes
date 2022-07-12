import Note from '../models/note.model';
import { client } from '../config/redis';


//create new note

export const newnote = async (body) => {
  const data = await Note.create(body);
  if(data){
    await client.del("notes");
    return data;
  }
  
};

//get all note

export const getAllNotes = async (AuthID) => {
  const data = await Note.find({UserID : AuthID});
  if (data){
    await client.set("note",JSON.stringify(data));
  }
  return data;
};

//get one note by id

export const getOneNote = async (id, AuthID) => {
  const data = await Note.findOne({_id:id, UserID:AuthID} );
    if(data)
    {
      return data;
    }
    else{
      throw new Error("Authentication Failed");
  }
  };

//Update note ######################

export const UpdateNote = async (paramsId, body, AuthID) => {
  const data = await Note.findOneAndUpdate({_id : paramsId, UserID : AuthID},body,{new: true});
  // console.log("Note.service note data : ", data);
    if(data){
    return data;
    }
    else {
        throw new Error("Authentication Failed");
    }
    };
  


// Delete Note #############

export const deleteNote = async (id,AuthID) => {
  const data = await Note.findOneAndDelete({_id:id,UserID:AuthID});
  if(data){
  return " " 
}
  else
  {
    throw new Error("Authentication Failed");
  }
};

// Archive note #############

export const noteArchive= async(id,AuthID)=>{

    const data = await Note.findOneAndUpdate({ _id : id , UserID : AuthID}, {isArchived : true}, {new : true});
    // console.log("Note.service archive date data : ", data);
  if(data){ 
    return data ;
  }
  else
  {
    throw new Error("Authentication Failed");
  }
};

// Unarchive note #############

export const noteUnarchive= async(id,AuthID)=>{

    const updateData = await Note.findOneAndUpdate({ _id : id , UserID : AuthID}, {isArchived : false}, {new : true});
  if(updateData){ 
    // console.log("This Is The archive status after archive: ",updateData);
    return updateData ;
  }
  else
  {
    throw new Error("Authentication Failed");
  }
};

// Move to Trash note #############

export const movetrash= async(id,AuthID)=>{
    const data = await Note.findOneAndUpdate({ _id : id }, {isDeleted : true}, {new : true});
    if(data){
      return data ;
    }else
    {
      throw new Error("Authentication Failed");
    }
  };
  
// Remove Trash note #############

export const removetrash= async(id,AuthID)=>{
  const data = await Note.findOneAndUpdate({ _id : id }, {isDeleted : false}, {new : true});
  if(data){
    return data ;
  }else
  {
    throw new Error("Authentication Failed");
  }
};



