import { GraphQLError } from 'graphql';

const EasyGraphQLTester = require('easygraphql-tester');
const { default: { ...definitions } } = require('./index');

const tester = new EasyGraphQLTester(definitions);

describe('test graphql schema', () => {
  it('should pass if googleAuth mutation is valid', () => {
    const mutation = `
  mutation {
  googleAuth(input: {
  accessToken: "some_mock_access_token"
  }){
  name
  }
  }`;
    tester.test(true, mutation, {
      googleAuth: {
        name: 'someone',
        token: 'something'
      }
    });
  });

  it('should fail if googleAuth mutation is invalid', () => {
    const mutation = `
    mutation {
  googleAuth(input: {
  accessToken: "some_mock_access_token"
  })}
    `;
    tester.test(false, mutation);
  });

  it('should pass if viewLabelledTasks mutation is valid', () => {
    const query = `
    query {
    viewLabelledTasks(input: {
    organization: "andela",
    repoName: "tembea"
    labelTag: "finished"
    number: 5
    }){
    number
    state
    title
    author {
    avatarUrl
    url
    }
    }
    }
    `;
    tester.test(true, query);
  });

  it('should fail if viewLabelledTasks mutation is invalid', () => {
    const query = `
    mutation {
    viewLabelledTasks(input: {
    organization: "andela",
    repoName: "tembea"
    labelTag: "finished"
    }){
    number
    state
    title
    author {
    avatarUrl
    url
    }
    }
    }
    `;
    tester.test(false, query);
  });

  it('should fail if viewPRAssigneesAndComments mutation is invalid', () => {
    const query = `
    query {
     viewPRAssigneesAndComments(input: {
        orgName: "andela"
        repoName: String!
        prNumber: Int!
     })
    }
    `;
    tester.test(false, query);
  });

  it('should pass if viewPRAssigneesAndComments mutation is valid', () => {
    const query = `
    query {
    viewPRAssigneesAndComments(input: {
        orgName: "allan"
        repoName: "repo"
        prNumber: 5
        numToDisplay: 3
     }){
     state
     labels {
     name
     description 
     }
     }
    }
    `;
    tester.test(true, query);
  });

  it('should pass if createUser mutation is valid', () => {
    const mutation = `
     mutation {
     createUser(input: {
     password: "allan"
     email: "allan@gmail.com"
     }){
        _id
        email
     }
     }`;
    tester.test(true, mutation);
    const { data: { createUser } } = tester.mock({ query: mutation });
    expect(createUser).toHaveProperty('_id');
    expect(createUser).toHaveProperty('email');
  });

  it('should pass if the getAllBoards mutation is valid', () => {
    const query = `
    query {
    getAllBoards {
    maxResults
    total
    }
    }
    `;
    tester.test(true, query);
  });

  it('should fail with an error if getAllBoards mutation is invalid', () => {
    try {
      const query = `
    query {
    getAllBoards
    }
    `;
      tester.mock({ query: query });
    } catch (err) {
      expect(err instanceof Error).toEqual(true);
      expect(err.message)
        .toEqual('Field "getAllBoards" of type "Board" '
          + 'must have a selection of '
          + 'subfields. Did you mean "getAllBoards { ... }"?');
    }
  });

  it('should pass if getSingleIssue mutation is valid', () => {
    const query = `
    query {
    getSingleIssue(issueProjectId: "ALL-123") {
    issueId
    issueUrl
    issueProjectKey
    assigneeDetails {
    self
    name
    key
    }
    }
    }
    `;
    tester.test(true, query);
  });

  it('should fail if getSingle mutation is invalid', () => {
    try {
      const query = `
    query {
    getSingleIssue {
    issueId
    issueUrl
    issueProjectKey
    assigneeDetails {
    self
    name
    key
    }
    }
    }
    `;
      tester.mock({ query: query });
    } catch (err) {
      expect(err instanceof Error).toEqual(true);
      expect(err.message).toEqual(
        'Argument "issueProjectId" of required type "String!" was not provided.'
      );
    }
  });

  it('should pass if getSprintStories mutation is valid', () => {
    const query = `
    query {
    getSprintStories(input: {
    boardId: 3
    idOfSprint: 29
    }) {
    maxResults
    total
    sprintIssues {
    issueId
    issueUrl
    active
    }
    }
    }
    `;
    tester.test(true, query);
  });

  it('should fail if getSprintStories mutation is invalid', () => {
    try {
      const query = `
    query {
    getSprintStories(input: {
    boardId: 3
    }) {
    maxResults
    total
    sprintIssues {
    issueId
    issueUrl
    active
    }
    }
    }
    `;
      tester.mock({ query: query });
    } catch (err) {
      expect(err.message).toEqual(
        'Argument "input" has invalid value {boardId: 3}.'
      );
    }
  });

  it('should pass if validateAndTransitionIssue is valid', () => {
    const query = `
    query {
    validateAndTransitionIssue(issueIdOrKey: "ALL-100", transitionId: 3) {
    success
    message
    }
    }
    `;
    tester.test(true, query);
  });

  it('should fail if validateAndTransitionIssue is invalid', () => {
    try {
      const query = `
    query {
    validateAndTransitionIssue(issueIdOrKey: "ALL-100", transitionId: "3") {
    success
    message
    }
    }
    `;
      tester.mock({ query: query });
    } catch (err) {
      expect(err.message).toBe('Argument "transitionId" has invalid value "3".');
    }
  });

  it('should pass if getTransitionsForIssue is valid', () => {
    const query = `
    query {
    getTransitionsForIssue(issueIdOrKey: "TAL-123") {
    expand
    transitions {
    id
    name
    }
    }
    }
    `;
    tester.test(true, query);
  });

  it('should fail if getTransitionsForIssue is invalid', () => {
    try {
      const query = `
    query {
    getTransitionsForIssue {
    transitions: {
    id
    name
    }
    }
    `;
      tester.mock({ query: query });
    } catch (err) {
      expect(err instanceof GraphQLError).toEqual(true);
      expect(err.message).toEqual('Syntax Error: Expected Name, found {');
    }
  });
});
