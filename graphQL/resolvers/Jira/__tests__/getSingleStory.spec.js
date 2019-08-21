import authorizationHandler from '../../../../helpers/unauthorizedResponse';
import { axiosJiraAgileConfig } from '../axiosConfig';
import app from '../../../../app';
import getSingleIssue from '../getSingleStory';

jest.mock('../../../../helpers/unauthorizedResponse', () => jest.fn());

authorizationHandler.mockReturnValue(null);

describe('test getSingleStory', () => {
  let req;
  let _;
  beforeEach(() => {
    req = Object.create(app);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('gets a single story details', async () => {
    jest.spyOn(axiosJiraAgileConfig, 'request').mockResolvedValueOnce({
      data: {
        id: 1,
        self: 'url',
        key: 'TEST-1',
        renderedFields: { description: 'testing' },
        fields: {
          issuetype: {
            name: 'testing',
            iconUrl: 'url'
          },
          sprint: {
            id: 1,
            self: 'url',
            name: 'sprint'
          },
          closedSprints: [],
          project: {
            avatarUrls: {
              '48x48': 'url'
            }
          },
          assignee: {},
          status: {
            statusCategory: 'To-Do'
          },
          creator: {
            displayName: 'testUser1'
          },
          active: true,
          reporter: {
            displayName: 'testUser1',
            avatarUrls: {
              '48x48': 'url'
            }
          }
        }
      }
    });
    const res = await getSingleIssue(_, { issueProjectId: 'TEM-123' }, { req });
    expect(axiosJiraAgileConfig.request).toHaveBeenCalled();
    expect(res).toEqual({
      issueId: 1,
      issueUrl: 'url',
      issueProjectKey: 'TEST-1',
      issueTypeDetails: { issueType: 'testing', issueTypeIconUrl: 'url' },
      sprintDetails: { sprintId: 1, sprintName: 'sprint', sprintUrl: 'url' },
      SprintsCoveredByStory: [],
      projectAvatarUrl: 'url',
      assigneeDetails: {},
      issueStatus: undefined,
      issueDescription: 'testing',
      issueCreator: 'testUser1',
      active: true,
      reporterDetails: { reporterAvatar: 'url', reporterName: 'testUser1' }
    });
  });

  it('catches and throws errors', async () => {
    jest.spyOn(axiosJiraAgileConfig, 'request').mockResolvedValueOnce(null);
    try {
      await getSingleIssue(_, { issueProjectId: 5 }, { req });
    } catch (err) {
      expect(err instanceof TypeError);
      expect(err.message).toEqual(
        'Cannot destructure property `data` of \'undefined\' or \'null\'.');
    }
  });
});
