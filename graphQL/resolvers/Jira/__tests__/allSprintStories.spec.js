import { axiosJiraAgileConfig } from '../axiosConfig';
import authorizationHandler from '../../../../helpers/unauthorizedResponse';
import getSprintStories from '../allSprintStories';
import app from '../../../../app';

jest.mock('../../../../helpers/unauthorizedResponse', () => jest.fn());

describe('test getSprintStories', () => {
  let _;
  let req;
  const inputObject = { input: { boardId: 20, idOfSprint: 1 } };
  beforeEach(() => {
    req = Object.create(app);
    authorizationHandler.mockReturnValueOnce(null);
    jest.spyOn(axiosJiraAgileConfig, 'request').mockResolvedValueOnce({
      data: {
        maxResults: 50,
        total: 49,
        issues: [
          {
            id: 1,
            self: 'url',
            key: 'TES-123',
            fields: {
              issuetype: {
                name: 'task',
                iconUrl: 'url'
              },
              sprint: {
                id: 20,
                self: 'url',
                name: 'sprintName1'
              },
              closedSprints: [],
              project: {
                avatarUrls: {
                  '48x48': 'url'
                }
              },
              assignee: [],
              status: {
                statusCategory: {
                  name: 'TO-DO'
                }
              },
              description: 'testing',
              creator: {
                displayName: 'testUser1'
              },
              active: true,
              reporter: {
                displayName: 'testUser2',
                avatarUrls: {
                  '48x48': 'url'
                }
              }
            }
          },

          {
            id: 2,
            self: 'url',
            key: 'TES-124',
            fields: {
              issuetype: {
                name: 'task',
                iconUrl: 'url'
              },
              sprint: {
                id: 20,
                self: 'url',
                name: 'sprintName1'
              },
              closedSprints: [],
              project: {
                avatarUrls: {
                  '48x48': 'url'
                }
              },
              assignee: [],
              status: {
                statusCategory: {
                  name: 'TO-DO'
                }
              },
              description: 'testing2',
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
          },
        ]
      }
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('returns an object representing sprint stories', async () => {
    const result = await getSprintStories(_, inputObject, { req });
    expect(axiosJiraAgileConfig.request).toHaveBeenCalled();
    expect(result).toHaveProperty('maxResults');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('sprintIssues');
    expect(result).toEqual(
      {
        maxResults: 50,
        total: 49,
        sprintIssues: [
          {
            issueId: 1,
            issueUrl: 'url',
            issueProjectKey: 'TES-123',
            issueTypeDetails: {
              issueType: 'task',
              issueTypeIconUrl: 'url',
            },
            sprintDetails: {
              sprintId: 20,
              sprintName: 'sprintName1',
              sprintUrl: 'url',
            },
            SprintsCoveredByStory: [],
            projectAvatarUrl: 'url',
            assigneeDetails: [],
            issueStatus: 'TO-DO',
            issueDescription: 'testing',
            issueCreator: 'testUser1',
            active: true,
            reporterDetails: {
              reporterName: 'testUser2',
              reporterAvatar: 'url'
            }
          },
          {
            issueId: 2,
            issueUrl: 'url',
            issueProjectKey: 'TES-124',
            issueTypeDetails: {
              issueType: 'task',
              issueTypeIconUrl: 'url',
            },
            sprintDetails: {
              sprintId: 20,
              sprintName: 'sprintName1',
              sprintUrl: 'url',
            },
            SprintsCoveredByStory: [],
            projectAvatarUrl: 'url',
            assigneeDetails: [],
            issueStatus: 'TO-DO',
            issueDescription: 'testing2',
            issueCreator: 'testUser1',
            active: true,
            reporterDetails: {
              reporterName: 'testUser1',
              reporterAvatar: 'url'
            }
          }
        ]
      }
    );
  });

  it('catches errors', async () => {
    jest.spyOn(axiosJiraAgileConfig, 'request').mockRejectedValueOnce(
      new Error('ECONNED_TIMEOUT')
    );
    try {
      await getSprintStories(_, inputObject, { req });
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toEqual('ECONNED_TIMEOUT');
    }
  });
});
