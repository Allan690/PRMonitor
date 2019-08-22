import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './graphQL/schema';
import resolvers from './graphQL/resolvers';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: ({ req, res }) => ({ req, res })
});

app.use(cors());
server.applyMiddleware({ app, bodyParserConfig: bodyParser.json() });

export default app;
