import { axiosJiraAgileConfig } from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';
import issueDestructurer from '../../../helpers/jiraIssueHelper';

const getSingleIssue = async (_, { issueProjectId }, { req }) => {
  authorizationHandler(req);
  try {
    const userStory = await axiosJiraAgileConfig.request({
      method: 'get',
      url: `issue/${issueProjectId}?expand=renderedFields`
    });
    const { data } = userStory;
    return issueDestructurer(data);
  } catch (err) {
    throw err;
  }
};

export default getSingleIssue;
