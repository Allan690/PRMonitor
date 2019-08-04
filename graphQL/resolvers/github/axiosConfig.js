import axios from 'axios';

const BASE_URL = 'https://api.github.com/graphql';

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
  }
});
export default axiosConfig;
