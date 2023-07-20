import Axios from 'axios';

const fetcher = Axios.create({
  baseURL: '/api',
});

export default fetcher;
