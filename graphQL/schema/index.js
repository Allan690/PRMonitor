import { gql } from 'apollo-server-express';

const schema = gql`
    type AuthResponse {
        token: String
        name: String
    }
    input AuthInput {
        accessToken: String!
    }
    type User {
        _id: ID!
        email: String!
        password: String
    }
    type Query {
        hello: String
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
        commNo: Int!
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
     type Mutation {
        googleAuth(input: AuthInput!): AuthResponse
        viewLabelledTasks(input: RepoAndPRDetails!): [node]
         viewPRAssigneesAndComments(input: PRDetails!): pullRequest
        createUser(userDetails: UserDetails!): User
    }
    schema {
        mutation: Mutation, query: Query
    }
`;
export default schema;
