import axios, {AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import useToken from '../components/Authentication/useToken';

const service = axios.create({baseURL: Config.REACT_APP_VISIT_API_ENDPOINT, timeout: 60000});

const { getToken } = useToken()

service.interceptors.request.use(
  async (config: any) => {
    const token = await getToken()
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.timeout = 60000;
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);
service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default service;
