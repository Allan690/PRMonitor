import passport from 'passport';
import { Strategy } from 'passport-google-token';
import dotenv from 'dotenv';

dotenv.config();
const GoogleTokenStrategyCallBack = (accessToken, refreshToken, profile, done) => done(null, {
  accessToken,
  refreshToken,
  profile
});

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
}, GoogleTokenStrategyCallBack));

const authenticateGoogle = async (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('google-token', { session: false }, (err, data, info) => {
    if (err) reject(err);
    resolve({ data, info });
  })(req, res);
});

export default authenticateGoogle;
