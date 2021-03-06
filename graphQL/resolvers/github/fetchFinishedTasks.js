import axiosConfig from './axiosConfig';
import authorizationHandler from '../../../helpers/unauthorizedResponse';
import axiosHelper from '../../../helpers/axiosHelper';

const viewLabelledTasks = async (_, {
  input: {
    organization, repoName, labelTag, number
  }
}, { req }) => {
  authorizationHandler(req);
  try {
    const results = await axiosConfig.request(axiosHelper(`
      query {
  repository(owner: "${organization}", name: "${repoName}"){
    pullRequests(labels: "${labelTag}", last: ${number}) {
      edges {
        node {
          state
          title
          number
          permalink
          author {
            avatarUrl
            url
            resourcePath
          }
        }
      }
    }
  }
}
      `));
    const { data: { data: repoData } } = results;
    const { repository: { pullRequests: { edges } } } = repoData;
    const newEdges = edges.map(obj => ({ ...obj.node }));
    return newEdges;
  } catch (err) {
    throw err;
  }
};

export default viewLabelledTasks;
