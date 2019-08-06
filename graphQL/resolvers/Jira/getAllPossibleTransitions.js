import { axiosJiraAPIConfig } from './axiosConfig';

const getTransitionsForIssue = async (_, { issueIdOrKey }) => {
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
