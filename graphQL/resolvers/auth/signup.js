import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import validateSignup from '../../../middleware/validateSignupBody';

const createUser = async (_, { input: { password, email } }, { req, res }) => {
  validateSignup(req, res, password, email);
  if (req.errors) {
    const { errors } = req;
    return res.status(400).json({
      success: false,
      messages: errors
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = new User({ email, password: hashedPassword });
    const result = await createdUser.save();
    return {
      ...result._doc, password: null, _id: result.id
    };
  } catch (err) {
    throw err;
  }
};

export default createUser;
