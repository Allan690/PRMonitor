import authorizationHandler from '../../../../helpers/unauthorizedResponse';
import axiosConfig from '../axiosConfig';
import viewPRAssigneesAndComments from '../viewPRAssignees';
import app from '../../../../app';

jest.mock('../../../../helpers/unauthorizedResponse', () => jest.fn());

describe('test viewPRAssigneesAndComments', () => {
  let args;
  let _;
  let req;

  beforeEach(() => {
    args = {
      input: {
        orgName: 'test',
        repoName: 'testRepo',
        prNumber: 124,
        numToDisplay: 2
      }
    };
    authorizationHandler.mockReturnValue(null);
    req = Object.create(app);
    jest.spyOn(axiosConfig, 'request').mockReturnValueOnce({
      data: {
        data: {
          repository: {
            pullRequest: {
              state: 'finished',
              assignees: {
                edges: [{
                  node: {
                    name: 'testUser1',
                    avatarUrl: 'url'
                  }
                },
                {
                  node: {
                    name: 'testUser2',
                    avatarUrl: 'url'
                  }
                }]
              },
              labels: {
                edges: [
                  {
                    node: {
                      name: 'finished',
                      createdAt: '2019-01-01'
                    }
                  },
                  {
                    node: {
                      name: 'In Progress',
                      createdAt: '2019-01-01'
                    }
                  }
                ]
              }
            }
          }
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches PR assignees and labels for a task', async () => {
    const appObject = { req };
    const results = await viewPRAssigneesAndComments(_, args, appObject);
    expect(axiosConfig.request).toHaveBeenCalled();
    expect(results).toHaveProperty('state');
    expect(results).toHaveProperty('assignees');
    expect(results).toHaveProperty('labels');
    expect(results).toEqual(
      {
        state: 'finished',
        assignees: [
          { name: 'testUser1', avatarUrl: 'url' },
          { name: 'testUser2', avatarUrl: 'url' }
        ],
        labels: [
          { name: 'finished', createdAt: '2019-01-01' },
          { name: 'In Progress', createdAt: '2019-01-01' }
        ]
      }
    );
  });

  it('catches and throws errors', async () => {
    const appObject = { req };
    jest.spyOn(axiosConfig, 'request').mockRejectedValueOnce(
      new Error('ECONNECT_TIMEDOUT')
    );
    try {
      await viewPRAssigneesAndComments(_, args, appObject);
    } catch (err) {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toEqual('ECONNECT_TIMEDOUT');
    }
  });
});
