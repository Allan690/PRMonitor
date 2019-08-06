import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${process.env.JIRA_ACCESS_TOKEN}`
};
const axiosJiraAgileConfig = axios.create({
  baseURL: process.env.JIRA_AGILE_URL, headers
});
const axiosJiraAPIConfig = axios.create({
  baseURL: process.env.JIRA_API_2_URL, headers
});

export { axiosJiraAgileConfig, axiosJiraAPIConfig };
