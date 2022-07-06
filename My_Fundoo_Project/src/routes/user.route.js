import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import * as auth from '../middlewares/auth.middleware';
const router = express.Router();


//route to create a new user
router.post('/', newUserValidator, userController.newUser);


//route to login a user ###################
router.post('/login',userController.login);

// Forget password #################

router.post('/forgetPass',userController.forgetPass );

//Reset Password ##################

router.put('/:_token',auth.restPassAuth, userController.resetPass );


export default router;
