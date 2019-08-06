import { axiosJiraAPIConfig } from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';

const getTransitionsForIssue = async (_, { issueIdOrKey }, { req }) => {
  authorizationHandler(req);
  try {
    const transitions = await axiosJiraAPIConfig.request({
      method: 'get',
      url: `issue/${issueIdOrKey}/transitions`
    });
    const { data } = transitions;
    return data;
  } catch (err) {
    throw err;
  }
};

export default getTransitionsForIssue;
