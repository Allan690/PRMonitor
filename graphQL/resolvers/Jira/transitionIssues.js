import { axiosJiraAPIConfig } from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';

const validateAndTransitionIssue = async (_, { issueIdOrKey, transitionId }, { req }) => {
  authorizationHandler(req);
  try {
    const transitionSuccessful = await axiosJiraAPIConfig.request({
      method: 'post',
      url: `issue/${issueIdOrKey}/transitions`,
      data: {
        transition: { id: transitionId }
      }
    });
    const { status } = transitionSuccessful;
    if (status === 204) {
      const response = {
        success: true,
        message: `Issue with ID ${issueIdOrKey} was transitioned successfully`
      };
      return response;
    }
    return {
      success: false,
      message: 'Could not transition the issue successfully'
    };
  } catch (err) {
    throw err;
  }
};

export default validateAndTransitionIssue;
