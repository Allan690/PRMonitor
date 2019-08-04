import authResolver from './auth';
import githubResolvers from './github';

const rootResolver = {
  ...authResolver, ...githubResolvers
};

export default rootResolver;
