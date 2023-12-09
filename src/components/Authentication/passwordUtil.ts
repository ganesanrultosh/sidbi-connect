import { randomKeys } from "../../services/authService"
import uuid from 'react-native-uuid';
import { sha256 } from 'react-native-sha256';

const encrypt = async (password: string) : Promise<{password: string, key: string}> => {
  let encryptedValue = {password: "", key: ""};
  await randomKeys(String(uuid.v4()))
    .then((response) => response.json())
    .then(async (data: Salt) => {
      await sha256(password)
        .then(async (hash) => {
          encryptedValue = {
            password: `${Math.random().toString(36).slice(2, 8)}${data.salt2}${hash}${data.salt1}${Math.random().toString(36).slice(2, 8)}`, 
            key: data.key}
          console.log("encryptedValue", encryptedValue, hash)
        }).catch((error) => {
          console.log('encryption error', error)
        })}).catch(error => {
          console.log('randomkeys', error)
        });
  return encryptedValue;
}

export default encrypt;