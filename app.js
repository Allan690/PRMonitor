import express from 'express';
import mongoose from 'mongoose';
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

server.applyMiddleware({ app, bodyParserConfig: bodyParser.json() });
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-yt8sz.mongodb.net/${process.env.MONGO_DB}`;
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000);
    console.log('listening on port 3000....');
  })
  .catch((err) => {
    console.log(err);
  });
