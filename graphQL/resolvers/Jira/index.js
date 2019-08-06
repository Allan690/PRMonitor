import getAllBoards from './getAllJiraBoards';
import getSprintStories from './allSprintStories';
import getSingleIssue from './getSingleStory';
import validateAndTransitionIssue from './transitionIssues';
import getTransitionsForIssue from './getAllPossibleTransitions';

const jiraResolvers = {
  Mutation: {
    getAllBoards,
    getSprintStories,
    getSingleIssue,
    validateAndTransitionIssue,
    getTransitionsForIssue
  }
};

export default jiraResolvers;
