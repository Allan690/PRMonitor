import authorizationHandler from '../unauthorizedResponse';
import app from '../../app';

describe('authorizationHandler test', () => {
  const req = Object.create(app);
  req.isAuth = false;

  it('should throw an error if req.isAuth is false', () => {
    try {
      authorizationHandler(req);
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toEqual('You are unauthorized to access this application');
    }
  });
});
