import { axiosJiraAgileConfig } from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';

const getAllBoards = async (_, options, { req }) => {
  authorizationHandler(req);
  try {
    const boards = await axiosJiraAgileConfig.request({
      method: 'get',
      url: 'board'
    });
    const { data: { maxResults, values, total } } = boards;

    const projectValues = values.map((project) => {
      const {
        id, self: url, name, location: { displayName, projectId }
      } = project;
      return {
        id, url, name, displayName, projectId
      };
    });
    const result = { maxResults, total, projectDetails: projectValues };
    return result;
  } catch (err) {
    throw err;
  }
};

export default getAllBoards;
