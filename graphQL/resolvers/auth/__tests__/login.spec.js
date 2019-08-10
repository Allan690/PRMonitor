import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import googleAuth from '../login';
import app from '../../../../app';
import User from '../../../../models/user';
import authenticateGoogle from '../../../../passport';

dotenv.config();

jest.mock('../../../../passport', () => jest.fn());

describe('loginWithAuth test', () => {
  const req = Object.create(app);
  const res = Object.create(app);
  const appObject = { req, res };
  const args = {
    input: { accessToken: 'access_token' }
  };
  let _;

  beforeEach(() => {
    jest.spyOn(User, 'findOne').mockReturnValue({
      user: {
        _id: 1,
        email: 'test@test.com',
        password: null
      }
    });
    authenticateGoogle.mockImplementation(() => ({
      data: {
        user: 'test',
        id: 1,
        profile: {
          _json: {
            id: 1,
            email: 'test@test.com',
            name: 'test',
            createdAt: '2019-01-01',
            updatedAt: '2019-01-01'
          }
        }
      },
      info: null
    }));
    jest.spyOn(jwt, 'sign');
  });

  it('authenticates user successfully', async () => {
    const result = await googleAuth(_, args, appObject);
    expect(authenticateGoogle).toHaveBeenCalledWith(req, res);
    expect(User.findOne).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('name');
    expect(result.name).toEqual('test');
  });

  it('throws a connection error if connection times out', async () => {
    authenticateGoogle.mockImplementationOnce(() => ({
      data: null,
      info: {
        code: 'ETIMEDOUT'
      }
    }));

    try {
      await googleAuth(_, args, appObject);
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toEqual('Failed to reach Google: Try Again');
    }
  });

  it('throws an error if something goes wrong', async () => {
    authenticateGoogle.mockImplementationOnce(() => ({
      data: null,
      info: {
        code: 'UNKNOWN_ERROR'
      }
    }));
    try {
      await googleAuth(_, args, appObject);
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toBe('something went wrong');
    }
  });

  it('throws an authentication error if user is not found', async () => {
    try {
      jest.spyOn(User, 'findOne').mockReturnValueOnce(null);
      await googleAuth(_, args, appObject);
    } catch (err) {
      expect(User.findOne).toHaveBeenCalled();
      expect(err.message).toEqual('Unauthorized access. Please contact admin');
    }
  });

  it('should throw errors', async () => {
    try {
      jest.spyOn(User, 'findOne').mockRejectedValueOnce('Logical error');
      await googleAuth(_, args, appObject);
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toEqual('Logical error');
    }
  });
});
