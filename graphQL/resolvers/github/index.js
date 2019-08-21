import viewLabelledTasks from './fetchFinishedTasks';
import viewPRAssigneesAndComments from './viewPRAssignees';

const githubResolvers = {
  Query: {
    viewLabelledTasks,
    viewPRAssigneesAndComments
  }
};

export default githubResolvers;
