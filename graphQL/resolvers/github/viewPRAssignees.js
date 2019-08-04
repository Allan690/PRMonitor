import axiosConfig from './axiosConfig';

// TODO: Ensure only authorized users can access this endpoint
const viewPRAssigneesAndComments = async (_,
  {
    input: {
      orgName, repoName, prNumber, numToDisplay
    }
  }) => {
  const results = await axiosConfig.request({
    url: '',
    method: 'post',
    data: {
      query: `
      query {
  repository(owner: "${orgName}", name: "${repoName}"){
    pullRequest(number: ${prNumber}) {
    state
    labels(first: 5) {
        edges {
          node {
            name
            description
          }
        }
      }
      assignees(first: ${numToDisplay}) {
        edges {
          node {
            avatarUrl
            name
          }
        }
      }
    }
}
}
      `
    }
  });
  const { data: { data: { repository: { pullRequest: { state, assignees, labels: { edges } } } } } } = results;
  const assigneeArray = assignees.edges.map(obj => ({ ...obj.node }));
  const labelsArray = edges.map(obj => ({ ...obj.node }));
  const finalResult = {
    state,
    assignees: assigneeArray,
    labels: labelsArray
  };
  return finalResult;
};

export default viewPRAssigneesAndComments;
