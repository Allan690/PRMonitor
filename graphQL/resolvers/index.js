import { merge } from 'lodash';
import authResolver from './auth';
import githubResolvers from './github';
import jiraResolvers from './Jira';

const rootResolver = merge(authResolver, githubResolvers, jiraResolvers);
export default rootResolver;
