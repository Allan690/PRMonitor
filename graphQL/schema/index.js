import { gql } from 'apollo-server-express';

const schema = gql`
    type AuthResponse {
        token: String
        name: String
        picture: String
    }
    input AuthInput {
        accessToken: String!
    }
    type User {
        _id: ID!
        email: String!
        password: String
    }
    input UserDetails {
        email: String!
        password: String
    }
    input RepoAndPRDetails {
        organization: String!
        repoName: String!
        labelTag: String!
        number: Int!
    }
    type node {
        state: String!
        title: String!
        number: Int!
        permalink: String!
        author: Author!
    }
    type Author {
        avatarUrl: String!
        url: String!
        resourcePath: String!
    }
    input PRDetails {
        orgName: String!
        repoName: String!
        prNumber: Int!
        numToDisplay: Int!
    }
    type pullRequest {
        state: String!
        labels: [labelData]
        assignees: [prassignee]
    }
    type prassignee {
        avatarUrl: String!
        name: String
    }
    
    type labelData {
        name: String!
        description: String!
    }
    type PRAuthor {
        avatarUrl: String!
        resourcePath: String!
    }
    type Board {
        maxResults: Int!
        total: Int!
        projectDetails: [project!]
    }
    type project {
        id: Int!
        url: String!
        name: String!
        displayName: String!
        projectId: Int!
    }
    input SprintAndStoryId {
        boardId: Int!
        idOfSprint: Int!
    }
    type sprintIssue {
        maxResults: Int!
        total: Int!
        sprintIssues: [issue]
    }
    type issueType {
        issueType: String!
        issueTypeIconUrl: String!
    }
    type sprintInfo {
        sprintId: Int!
        sprintName: String!
        sprintUrl: String!
    }
    type closedSprints {
        id: Int!
        name: String!
        self: String!
        state: String!
        startDate: String!
        endDate: String!
        goal: String
    }
    
    type issueAssignee {
        self: String
        name: String
        key: String
        displayName: String
        active: Boolean
        url: String
    }
    
    type reporterInfo {
        reporterAvatar: String!
        reporterName: String!
    }
    type issue {
        issueId: Int!,
        issueUrl: String!
        issueProjectKey: String!
        issueTypeDetails: issueType,
        sprintDetails: sprintInfo
        SprintsCoveredByStory: [closedSprints]
        projectAvatarUrl: String!
        issueStatus: String!
        issueDescription: String
        issueCreator: String!
        active: Boolean!
        assigneeDetails: issueAssignee
        reporterDetails: reporterInfo
        summary: String!
    }
    type transitionSuccess {
        success: Boolean
        message: String
    }
    type transitionData {
        expand: String!
        transitions: [transitionMetaData]
    }
    type transitionMetaData {
        id: Int!
        name: String!
        to: transition
    }
    type transition {
        self: String!
        description: String
        iconUrl: String
        name: String
        id: Int!
        isInitial: Boolean
        isConditional: Boolean
    }
    
    type SprintData {
        maxResults: Int!
        total: Int
        Sprints: [sprintDetails]
    }
    
    type sprintDetails {
        id: Int!
        self: String
        state: String
        name: String
        startDate: String
        endDate: String
        completeDate: String
        originBoardId: Int
    }
     type Mutation {
         googleAuth(input: AuthInput!): AuthResponse
         createUser(input: UserDetails!): User
    }
    type Query {
        viewLabelledTasks(input: RepoAndPRDetails!): [node]
        viewPRAssigneesAndComments(input: PRDetails!): pullRequest
        getAllBoards: Board
        getSingleIssue(issueProjectId: String!): issue
        getSprintStories(input: SprintAndStoryId!): sprintIssue
        validateAndTransitionIssue(issueIdOrKey: String! transitionId: Int!): transitionSuccess
        getTransitionsForIssue(issueIdOrKey: String!): transitionData
        getAllSprints(boardId: Int!): SprintData
    }
    schema {
        mutation: Mutation, query: Query
    }
`;
export default schema;
