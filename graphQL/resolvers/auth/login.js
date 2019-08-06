import jwt from 'jsonwebtoken';
import authenticateGoogle from '../../../passport';
import User from '../../../models/user';

const googleAuth = async (_, { input: { accessToken } }, { req, res }) => {
  req.body = {
    ...req.body, access_token: accessToken
  };
  try {
    const { data, info } = await authenticateGoogle(req, res);
    if (data) {
      const { profile: { _json: fetchedUser } } = data;
      const { email, name } = fetchedUser;
      const user = await User.findOne({ email });
      if (!user) {
        return new Error('Unauthorized access. Please contact admin');
      }
      const token = await jwt.sign({
        userId: fetchedUser.id, email
      }, process.env.SECRET_KEY,
      { expiresIn: '1h' });
      return { token, name };
    }
    if (info) {
      if (info.code === 'ETIMEDOUT') {
        return (new Error('Failed to reach Google: Try Again'));
      }
      return (new Error('something went wrong'));
    }
  } catch (err) {
    throw err;
  }
};

export default googleAuth;
