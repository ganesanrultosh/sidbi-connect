import Config from 'react-native-config';
import useToken from '../components/Authentication/useToken';

const apiEndpoint = Config.REACT_APP_API_ENDPOINT;

console.log("End point: ", apiEndpoint);

const { getToken } = useToken()

async function sendConsent(request: { mobileNo: string | undefined }) {
  if(request.mobileNo) {
    const token = await getToken()
    return fetch(`${apiEndpoint}/api/${request.mobileNo}/otp/generate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  
}
export { sendConsent };