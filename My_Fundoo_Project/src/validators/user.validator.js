import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fname: Joi.string().min(2).required(),
    sname: Joi.string().min(2).required(),
    mailid: Joi.string().email().trim(true).required(),
    password: Joi.string().min(3).max(15).required(),
    // confirmPassword:Joi.string().required().valid(Joi.ref('password'))
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
