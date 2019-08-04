import viewLabelledTasks from './fetchFinishedTasks';
import viewPRAssigneesAndComments from './viewPRAssignees';

const githubResolvers = {
  Mutation: {
    viewLabelledTasks,
    viewPRAssigneesAndComments
  }
};

export default githubResolvers;
