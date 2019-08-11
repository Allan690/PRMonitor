import { axiosJiraAPIConfig } from '../axiosConfig';
import validateAndTransitionIssue from '../transitionIssues';
import authorizationHandler from '../../../../helpers/unauthorizedResponse';
import app from '../../../../app';

jest.mock('../../../../helpers/unauthorizedResponse', () => jest.fn());
authorizationHandler.mockReturnValue(null);

describe('test transitionIssues', () => {
  let req;
  let _;
  beforeEach(() => {
    req = Object.create(app);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('validates and transitions issues successfully', async () => {
    jest.spyOn(axiosJiraAPIConfig, 'request').mockResolvedValueOnce({
      status: 204
    });
    const res = await validateAndTransitionIssue(_, { issueIdOrKey: 5, transitionId: 3 }, { req });
    expect(axiosJiraAPIConfig.request).toHaveBeenCalled();
    expect(res).toEqual({
      success: true,
      message: 'Issue with ID 5 was transitioned successfully'
    });
  });

  it('returns an error message if transition fails', async () => {
    jest.spyOn(axiosJiraAPIConfig, 'request').mockResolvedValueOnce({
      status: 404
    });
    const res = await validateAndTransitionIssue(_, { issueIdOrKey: 5, transitionId: 3 }, { req });
    expect(axiosJiraAPIConfig.request).toHaveBeenCalled();
    expect(res).toEqual(
      {
        success: false,
        message: 'Could not transition the issue successfully'
      }
    );
  });

  it('catches errors', async () => {
    jest.spyOn(axiosJiraAPIConfig, 'request').mockResolvedValueOnce(null);
    try {
      await validateAndTransitionIssue(_, { issueIdOrKey: 5, transitionId: 3 }, { req });
    } catch (err) {
      expect(err instanceof TypeError).toBe(true);
      expect(err.message).toEqual(
        'Cannot destructure property `status` of \'undefined\' or \'null\'.'
      );
    }
  });
});
