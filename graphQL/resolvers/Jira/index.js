import getAllBoards from './getAllJiraBoards';
import getSprintStories from './allSprintStories';
import getSingleIssue from './getSingleStory';
import validateAndTransitionIssue from './transitionIssues';
import getTransitionsForIssue from './getAllPossibleTransitions';
import getAllSprints from "./getAllSprints";

const jiraResolvers = {
  Mutation: {
    getAllBoards,
    getSprintStories,
    getSingleIssue,
    validateAndTransitionIssue,
    getTransitionsForIssue,
    getAllSprints
  }
};

export default jiraResolvers;
