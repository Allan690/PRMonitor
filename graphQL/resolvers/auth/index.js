import googleAuth from './login';
import createUser from './signup';

const authResolvers = { Mutation: { googleAuth, createUser } };

export default authResolvers;
