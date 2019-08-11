import { axiosJiraAgileConfig } from '../axiosConfig';
import authorizationHandler from '../../../../helpers/unauthorizedResponse';
import getAllBoards from '../getAllJiraBoards';
import app from '../../../../app';

jest.mock('../../../../helpers/unauthorizedResponse', () => jest.fn());

describe('test getAllBoards', () => {
  let req;
  let _;
  const options = {};
  authorizationHandler.mockReturnValue(null);
  beforeEach(() => {
    req = Object.create(app);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('catches errors', async () => {
    try {
      jest.spyOn(axiosJiraAgileConfig, 'request').mockReturnValueOnce(null);
      await getAllBoards(_, options, { req });
    } catch (err) {
      expect(err instanceof TypeError);
      expect(err.message).toEqual(
        'Cannot destructure property `data` of \'undefined\' or \'null\'.');
    }
  });

  it('returns all current jira projects', async () => {
    jest.spyOn(axiosJiraAgileConfig, 'request').mockReturnValueOnce(
      {
        data: {
          maxResults: 50,
          total: 49,
          values: [
            {
              id: 1,
              self: 'url',
              name: 'test1',
              location: {
                displayName: 'test',
                projectId: 'TEST-123'
              }
            },
            {
              id: 2,
              self: 'url',
              name: 'test2',
              location: {
                displayName: 'test2',
                projectId: 'TEST-234'
              }
            }
          ]
        }

      }
    );
    const result = await getAllBoards(_, options, { req });
    expect(axiosJiraAgileConfig.request).toHaveBeenCalled();
    expect(result).toHaveProperty('maxResults');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('projectDetails');
    expect(result).toEqual(
      {
        maxResults: 50,
        total: 49,
        projectDetails: [
          {
            id: 1,
            url: 'url',
            name: 'test1',
            displayName: 'test',
            projectId: 'TEST-123'
          },
          {
            id: 2,
            url: 'url',
            name: 'test2',
            displayName: 'test2',
            projectId: 'TEST-234'
          }
        ]
      }
    );
  });
});
