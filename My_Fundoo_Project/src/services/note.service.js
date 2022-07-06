import Note from '../models/note.model';



//create new note

export const newnote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//get all note

export const getAllNotes = async (AuthID) => {
  const data = await Note.find({UserID : AuthID});
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
  const data = await await Note.findOneAndUpdate({_id : paramsId, UserID : AuthID},body,{new: true});
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
  const data = await Note.findById(id);
  // console.log("This Is The archive status before archive: ",data);
  if(data!= null && data.isArchived == false && data.UserID == AuthID ){
    // console.log("This is for note.service id : ",id);
    const updateData = await Note.findOneAndUpdate({ _id : id }, {isArchived : true}, {new : true});
    // console.log("This Is The archive status after archive: ",updateData);
    return updateData ;
  }else if (data!= null && data.isArchived==true && data.UserID == AuthID){
    const updateData = await Note.findOneAndUpdate({ _id : id }, {isArchived : false}, {new : true});
    return updateData ;
  }
  else
  {
    throw new Error("Authentication Failed");
  }
};


// Trash note #############

export const trash= async(id,AuthID)=>{
  const data = await Note.findById(id);
  // console.log("This Is The isDeleted status before move to trash: ",data);
  if(data!= null && data.isDeleted==false && data.UserID==AuthID){
    // console.log("This is for note.service id : ",id);
    const updateData = await Note.findOneAndUpdate({ _id : id }, {isDeleted : true}, {new : true});
    // console.log("This Is The IsDeleted status after move to trash: ",updateData);
    return updateData ;
  }else if (data!= null && data.isDeleted==true && data.UserID==AuthID) {
    const updateData = await Note.findOneAndUpdate({ _id : id }, {isDeleted : false}, {new : true});
    return updateData ;
  } 
  else
  {
    throw new Error("Authentication Failed");
  }
};




