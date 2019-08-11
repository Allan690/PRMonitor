import { axiosJiraAPIConfig } from '../axiosConfig';
import authorizationHandler from '../../../../helpers/unauthorizedResponse';
import getTransitionsForIssue from '../getAllPossibleTransitions';
import app from '../../../../app';

jest.mock('../../../../helpers/unauthorizedResponse', () => jest.fn());

authorizationHandler.mockReturnValue(null);

describe('test getAllTransitions', () => {
  let req;
  let _;
  beforeEach(() => {
    req = Object.create(app);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get all possible transitions for an issue', async () => {
    jest.spyOn(axiosJiraAPIConfig, 'request').mockResolvedValueOnce(
      {
        data: {
          data: []
        }
      }
    );
    const results = await getTransitionsForIssue(_, { issueIdOrKey: 5 }, { req });
    expect(axiosJiraAPIConfig.request).toHaveBeenCalled();
    expect(results).toHaveProperty('data');
  });

  it('catches errors', async () => {
    jest.spyOn(axiosJiraAPIConfig, 'request').mockResolvedValueOnce(null);
    try {
      await getTransitionsForIssue(_, { issueIdOrKey: 5 }, { req });
    } catch (err) {
      expect(err instanceof TypeError);
      expect(err.message).toEqual(
        'Cannot destructure property `data` of \'undefined\' or \'null\'.'
      );
    }
  });
});
