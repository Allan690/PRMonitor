import { axiosJiraAgileConfig } from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';

const getAllSprints = async (_, { boardId }, { req }) => {
    authorizationHandler(req);
    try {
        const sprints = await axiosJiraAgileConfig.request({
            method: 'get',
            url: `board/${boardId}/sprint`
        });
        const { data: { maxResults, total, values } } = sprints;
        const AllSprints = {
            maxResults, total, Sprints:values
        };
        return AllSprints;
    } catch (err) {
        throw err;
    }
};

export default getAllSprints;
