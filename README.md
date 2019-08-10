# PR-Monitor v1
[![Maintainability](https://api.codeclimate.com/v1/badges/5e8021bf53de9b140da2/maintainability)](https://codeclimate.com/github/Allan690/PRMonitor/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5e8021bf53de9b140da2/test_coverage)](https://codeclimate.com/github/Allan690/PRMonitor/test_coverage)
[![CircleCI](https://circleci.com/gh/Allan690/PRMonitor.svg?style=svg)](https://circleci.com/gh/Allan690/PRMonitor)


PR-Monitor is a GraphQL API built with node.js, Apollo Server and MongoDB with Mongoose as the ODM. This API helps Product Managers(PMs) and coordinators monitor the state of PRs and issues on Github and JIRA.

## Getting Started
1. Clone this repository to your local machine
2. Checkout to the develop branch: `git checkout develop`;
3. Create an account(if you don't have one) with cloud.mongodb.com and add a new database and collection.
4. Create a `.env` file at the root of the application folder with the following details: 
```dotenv
MONGO_USER=mongo_db_user
MONGO_DB=mongo_db_name
MONGO_PASSWORD=mongo_db_password
CLIENT_ID=google_client_id
CLIENT_SECRET=google_client_secret
SECRET_KEY=your_secret_key_here
GITHUB_ACCESS_TOKEN=your_access_token_from_github
```
5. Populate your env file with your database connection details(first 3 lines).
6. Create a Github access token to fetch data from your repositories by following [this guide](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).
7. Get your client id and secret from Google for authentication via Google's Oauth 2 by following [this guide](https://developers.google.com/identity/sign-in/web/sign-in)
8. With all your fields populated, you can install all requirements for the project and start the server by running: `yarn && yarn start:dev` on your terminal

### Prerequisites
1. Latest version of node.js
2. MongoDB - database
3. Yarn/NPM - for dependency management

## Authors
Allan Mogusu
