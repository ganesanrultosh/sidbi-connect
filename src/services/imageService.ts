import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import service from './index';
import moment from 'moment';
import useToken from '../components/Authentication/useToken';

const { getToken } = useToken()

const ImageService = {

  postImage: async (image: any, panNumber: string) => {
    try {
      let params = new FormData();
      params.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      const token = await getToken()
      console.log('post url', `${Config.REACT_APP_FILE_SERVER_URL!}/files/${panNumber}`)
      console.log("token", token)
      const res = await axios.post(`${Config.REACT_APP_FILE_SERVER_URL!}/files/${panNumber}`, params, {
        baseURL: Config.REACT_APP_FILE_SERVER_URL!,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        transformRequest: formData => formData,
      });
      return res.data;
    } catch (error: any) {
      console.log(error?.message)
      throw new Error(error?.message);
    }
  },
};

export default ImageService;
