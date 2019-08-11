import bcrypt from 'bcryptjs';
import User from '../../../../models/user';
import createUser from '../signup';
import app from '../../../../app';

jest.mock('../../../../models/user', () => jest.fn());

describe('test signup', () => {
  let appObject;
  let _;
  let req;
  let res;
  let credentials;
  beforeEach(() => {
    credentials = {
      input: { password: 'somepassword', email: 'test@test.com' }
    };
    req = Object.create(app);
    res = {
      status() {
        return this;
      },
      json() {
        return this;
      }
    };
    jest.spyOn(res, 'status');
    jest.spyOn(res, 'json');
    appObject = { req, res };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns a 409 conflict error if user exists', async () => {
    User.findOne = jest.fn().mockReturnValueOnce({
      user: {
        _id: 1,
        email: 'test@test.com',
        password: null
      }
    });
    await createUser(_, credentials, appObject);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'User already exists'
    });
  });

  it('returns errors if validation fails', async () => {
    credentials = {
      input: { password: '', email: 'test@test.com' }
    };
    await createUser(_, credentials, appObject);
    expect(req).toHaveProperty('errors');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      messages: ['Your password is not allowed to be empty']
    });
  });

  it('hashes the password and creates the user', async () => {
    jest.spyOn(bcrypt, 'hash');
    credentials = {
      input: { password: 'test123', email: 'test@test.com' }
    };
    User.prototype.save = jest.fn(() => ({
      id: 1,
      _doc: {
        _id: 1,
        email: 'test@test.com',
        password: 'hashedPassword'
      }
    }));
    User.findOne = jest.fn(() => null);
    User.mockReturnValueOnce({
      email: 'test@test.com',
      password: 'hashedPassword'
    });
    const result = await createUser(_, credentials, appObject);
    expect(User.findOne).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(User).toHaveBeenCalled();
    expect(result).toEqual({
      _id: 1, email: 'test@test.com', password: null
    });
  });

  it('catches and throws errors', async () => {
    try {
      User.findOne = jest.fn().mockRejectedValueOnce('mongoError: error details');
      await createUser(_, credentials, appObject);
    } catch (err) {
      expect(err).toEqual('mongoError: error details');
    }
  });
});
