import viewLabelledTasks from '../fetchFinishedTasks';
import authorizationHandler from '../../../../helpers/unauthorizedResponse';
import app from '../../../../app';
import axiosConfig from '../axiosConfig';

jest.mock('../../../../helpers/unauthorizedResponse', () => jest.fn());

describe('test viewLabelledTasks', () => {
  let args;
  let req;
  let _;
  const appObject = { req };
  beforeEach(() => {
    authorizationHandler.mockReturnValue(null);
    args = {
      input: {
        organization: 'test', repoName: 'testRepo', labelTag: 'finished', number: 10
      }
    };
    req = Object.create(app);
    jest.spyOn(axiosConfig, 'request').mockReturnValueOnce({
      data: {
        data: {
          repository: {
            pullRequests: {
              edges: [
                {
                  node: {
                    title: 'title',
                    description: 'description',
                    assignees: [],
                    creator: {
                      userName: 'test123',
                      avatarUrl: 'avatarUrl'
                    },
                    label: 'finished'
                  }
                },
                {
                  node: {
                    title: 'title2',
                    description: 'description2',
                    assignees: [],
                    creator: {
                      userName: 'test1234',
                      avatarUrl: 'avatarUrl1'
                    },
                    label: 'finished'
                  }
                }
              ]
            }
          }
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches finished tasks from the github api', async () => {
    const results = await viewLabelledTasks(_, args, appObject);
    expect(axiosConfig.request).toHaveBeenCalled();
    expect(results).toEqual(
      [
        {
          title: 'title',
          description: 'description',
          assignees: [],
          creator: { userName: 'test123', avatarUrl: 'avatarUrl' },
          label: 'finished'
        },
        {
          title: 'title2',
          description: 'description2',
          assignees: [],
          creator: { userName: 'test1234', avatarUrl: 'avatarUrl1' },
          label: 'finished'
        }
      ]
    );
  });

  it('catches and throws errors', async () => {
    jest.spyOn(axiosConfig, 'request').mockRejectedValueOnce(
      new Error('querySrv ECONNREFUSED')
    );
    try {
      await viewLabelledTasks(_, args, appObject);
    } catch (err) {
      expect(err instanceof Error).toEqual(true);
      expect(err.message).toEqual('querySrv ECONNREFUSED');
    }
  });
});
