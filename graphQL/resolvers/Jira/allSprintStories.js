import { axiosJiraAgileConfig } from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';

const getSprintStories = async (_, { input: { boardId, idOfSprint } }, { req }) => {
  authorizationHandler(req);
  try {
    const sprintStories = await axiosJiraAgileConfig.request({
      method: 'get',
      url: `board/${boardId}/sprint/${idOfSprint}/issue`
    });
    const { data: { maxResults, total, issues } } = sprintStories;
    const sprintIssues = issues.map((issue) => {
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
          description: issueDescription, creator: { displayName: issueCreator }, active,
          reporter: { displayName: reporterName, avatarUrls: { '48x48': reporterAvatar } }
        },
      } = issue;
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
    });
    const issuesObject = {
      maxResults, total, sprintIssues
    };
    return issuesObject;
  } catch (err) {
    throw err;
  }
};

export default getSprintStories;
