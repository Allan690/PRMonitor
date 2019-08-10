import jwt from 'jsonwebtoken';
import isAuthorized from '../isAuth';
import app from '../../app';

describe('test isAuth middleware', () => {
  let req;
  beforeEach(() => {
    req = Object.create(app);
    jest.spyOn(jwt, 'verify');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create isAuth property inside the req object', () => {
    isAuthorized(req);
    expect(req).toHaveProperty('isAuth');
    expect(req.isAuth).toBe(false);
  });

  it('should create and set isAuth property to false if Authorization header is empty', () => {
    jest.spyOn(req, 'get').mockReturnValue(
      'Bearer '
    );
    isAuthorized(req);
    expect(req).toHaveProperty('isAuth');
    expect(req.isAuth).toBe(false);
  });

  it('should verify the token and return isAuth as false for invalid tokens', () => {
    const token = 'Bearer eJywqWXSasxsxsHSBs';
    jest.spyOn(req, 'get').mockReturnValue(token);
    isAuthorized(req);
    expect(jwt.verify).toHaveBeenCalledWith('eJywqWXSasxsxsHSBs', process.env.SECRET_KEY);
    expect(req).toHaveProperty('isAuth');
    expect(req.isAuth).toBe(false);
  });

  it('should decode a valid token and set isAuth to true and set userId', async () => {
    const newToken = await jwt.sign({ userId: 1, email: 'test@gmail.com' }, process.env.SECRET_KEY,
      { expiresIn: '5m' });
    const token = `Bearer ${newToken}`;
    jest.spyOn(req, 'get').mockReturnValue(token);
    isAuthorized(req);
    expect(jwt.verify).toHaveBeenCalledTimes(1);
    expect(req).toHaveProperty('isAuth');
    expect(req.isAuth).toBe(true);
    expect(req).toHaveProperty('userId');
    expect(req.userId).toEqual(1);
  });
});
