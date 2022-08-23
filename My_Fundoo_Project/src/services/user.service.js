import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mail';



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
};



// Forget password #################

export const forgetPass = async (inputMailID)=>{
  const data = await User.findOne({mailid:inputMailID});
  // console.log("This is from user.services......  check input mail id : ", inputMailID);
  if(data){
    var resetToken= jwt.sign({ mailid: data.mailid, id:data._id}, process.env.RESETPASSWORDKEY);
    const mail = await sendMail(data.mailid,resetToken);
    return mail;
  }else{
    throw new Error("Incorrect Mail ID");
  }
};



// Reset Password #############

export const resetPass = async (body)=>{
  
  const salt = 10
  const hashpassword = await bcrypt.hash(body.password,salt)
  const updateData = await User.findOneAndUpdate({mailid : body.mailid},{password:hashpassword},{new:true})  
  return updateData;

};