import isAuthorized from '../middleware/isAuth';

const authorizationHandler = (req) => {
  isAuthorized(req);
  if (!req.isAuth) {
    throw new Error('You are unauthorized to access this application');
  }
};

export default authorizationHandler;
