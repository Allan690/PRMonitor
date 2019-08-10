import joi from '@hapi/joi';

const schema = joi.object().keys({
  email: joi.string().email().required().trim()
    .label('Your email address'),
  password: joi.string().required().trim().label('Your password')
});

const validateSignup = (req, res, password, email) => {
  const errorArray = [];
  const { error, value } = joi.validate({ email, password }, schema, { abortEarly: false });
  if (error) {
    const errors = error.details;
    errors.forEach((err) => {
      const cleanedErrorMessage = err.message.replace(/['"]+/g, '');
      errorArray.push(cleanedErrorMessage);
    });
    req.errors = errorArray;
    return;
  }
  req.body = value;
};

export default validateSignup;
