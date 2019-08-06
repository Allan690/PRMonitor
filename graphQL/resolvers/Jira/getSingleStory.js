import { axiosJiraAgileConfig } from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';

const getSingleIssue = async (_, { issueProjectId }, { req }) => {
  authorizationHandler(req);
  try {
    const userStory = await axiosJiraAgileConfig.request({
      method: 'get',
      url: `issue/${issueProjectId}`
    });
    const { data } = userStory;
    const {
      id: issueId,
      self: issueUrl,
      key: issueProjectKey,
      fields: {
        issuetype: { name: issueType, iconUrl: issueTypeIconUrl },
        sprint: { id: sprintId, self: sprintUrl, name: sprintName },
        closedSprints: SprintsCoveredByStory,
        project: { avatarUrls: { '48x48': projectAvatarUrl } },
        assignee,
        status: { statusCategory: { name: issueStatus } },
        description: issueDescription,
        creator: { displayName: issueCreator }, active,
        reporter: { displayName: reporterName, avatarUrls: { '48x48': reporterAvatar } }
      },
    } = data;
    return {
      issueId,
      issueUrl,
      issueProjectKey,
      issueTypeDetails: {
        issueType,
        issueTypeIconUrl,
      },
      sprintDetails: {
        sprintId,
        sprintName,
        sprintUrl
      },
      SprintsCoveredByStory,
      projectAvatarUrl,
      assigneeDetails: assignee,
      issueStatus,
      issueDescription,
      issueCreator,
      active,
      reporterDetails: {
        reporterAvatar,
        reporterName
      }
    };
  } catch (err) {
    throw err;
  }
};

export default getSingleIssue;
