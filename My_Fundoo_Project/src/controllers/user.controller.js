import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
 

//User Registration#####################################

export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User Registration Is Successfull'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });

  }
};

//User Login ####################################

export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User Login Succesfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });

  }
};


// Forget password #################

export const forgetPass =async(req,res,next)=>{
  try{
    const data = await UserService.forgetPass(req.body.mailid);
    // console.log("This is from user.controller......  check input mail id : ", req.body.mailid);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
          data: data,
          message: 'Reset mail sent to registerd mailid'
    });
  }
  catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    }); 
  }
};

// Reset Password #########################

export const resetPass = async (req,res,next)=>{
  try{
    const data = await UserService.resetPass(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
          data: data,
          message: 'Password Updated Succesfully'
    });
  }catch(error){
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
          data: data,
          message: 'Password Updated Succesfully'
      });
    }
  };