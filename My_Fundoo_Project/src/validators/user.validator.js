import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    First_name: Joi.string().min(2).required(),
    Second_name: Joi.string().min(2).required(),
    mailid: Joi.string().email().trim(true).required(),
    password: Joi.string().min(3).max(15).required(),
    // confirmPassword:Joi.string().required().valid(Joi.ref('password'))
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};
