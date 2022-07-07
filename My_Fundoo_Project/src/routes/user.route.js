import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { PassAuth } from '../middlewares/auth.middleware';
const router = express.Router();


//route to create a new user
router.post('/', newUserValidator, userController.newUser);


//route to login a user ###################
router.post('/login',userController.login);

// Forget password #################

router.post('/forgetPass',userController.forgetPass );

//Reset Password ##################

router.post('/:_token',PassAuth, userController.resetPass );


export default router;
