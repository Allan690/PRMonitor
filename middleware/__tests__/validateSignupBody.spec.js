import joi from '@hapi/joi';
import validateSignup from '../validateSignupBody';
import app from '../../app';

describe('validateSignupBody test', () => {
  let req;
  let res;
  beforeEach(() => {
    req = Object.create(app);
    res = Object.create(app);
    jest.spyOn(joi, 'validate');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns an array of errors if either username or password is missing', () => {
    const email = 'test@test.com';
    const password = '';
    validateSignup(req, res, password, email);
    expect(joi.validate).toHaveBeenCalled();
    expect(req).toHaveProperty('errors');
    expect(req.errors).toEqual(
      ['Your password is not allowed to be empty']
    );
  });

  it('does not return errors when user credentials are valid', () => {
    const email = 'test@test.com';
    const password = 'test123';
    validateSignup(req, res, password, email);
    expect(joi.validate).toHaveBeenCalled();
    expect(req).not.toHaveProperty('errors');
    expect(req.body).toEqual({ email, password });
  });
});
