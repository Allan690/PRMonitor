import { axiosJiraAgileConfig } from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';
import issueDestructurer from '../../../helpers/jiraIssueHelper';

const getSprintStories = async (_, { input: { boardId, idOfSprint } }, { req }) => {
  authorizationHandler(req);
  try {
    const sprintStories = await axiosJiraAgileConfig.request({
      method: 'get',
      url: `board/${boardId}/sprint/${idOfSprint}/issue`
    });
    const { data: { maxResults, total, issues } } = sprintStories;
    const sprintIssues = issues.map(issue => issueDestructurer(issue));
    const issuesObject = {
      maxResults, total, sprintIssues
    };
    return issuesObject;
  } catch (err) {
    throw err;
  }
};

export default getSprintStories;
