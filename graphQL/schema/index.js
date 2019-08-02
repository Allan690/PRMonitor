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
     type Mutation {
        googleAuth(input: AuthInput!): AuthResponse
        createUser(userDetails: UserDetails!): User
    }
    schema {
        mutation: Mutation, query: Query
    }
`;
export default schema;
