import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// //get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

// //create new user
// export const newUser = async (body) => {
//   const data = await User.create(body);
//   return data;
// };

// //update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

//// get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };


// Registration##############



export const newUser = async (body) => {
  
  const saltRounds= 10
  const hashpassword= await bcrypt.hash(body.password, saltRounds)
  body.password = hashpassword
  const data = await User.create(body);
  return data;
};

// login User############

export const login = async (body) => {

  const result = await User.findOne({mailid:body.mailid});
  // console.log(result)
  
  if(result!= null){
    
    const comparePass =await bcrypt.compare(body.password, result.password);
    if(comparePass){

      var token = jwt.sign({ mailid: result.mailid, id:result._id}, process.env.SECRATEKEY);
      return token
    
    }else{
      throw new Error("Password is incorrect")
    }


  }else{
    throw new Error("Mail Is not exist")
  }


  // if(result){
  //   const comparePass =await bcrypt.compare(body.password, result.password);
  //   console.log(comparePass);
  //   if(comparePass){
  //     return result;
  //   }
  //   else{
  //     difError;
  //   }
    
  // }

};


