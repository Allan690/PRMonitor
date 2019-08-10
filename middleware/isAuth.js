import jwt from 'jsonwebtoken';

const isAuthorized = (req) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    req.isAuth = false;
    return;
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
};

export default isAuthorized;
