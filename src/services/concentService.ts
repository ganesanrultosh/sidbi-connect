import Config from 'react-native-config';
import useToken from '../components/Authentication/useToken';

const apiEndpoint = Config.REACT_APP_API_ENDPOINT;

console.log("End point: ", apiEndpoint);

const { getToken } = useToken()

async function sendOtp(
  request: { 
    mobileNo: string | undefined,
    emailId: string | undefined
  }) {
  if(request.mobileNo) {
    const token = await getToken()
    return fetch(`${apiEndpoint}/auth/otp/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    });
  }
  
}
async function sendConsent(
  request: { 
    partnerId: number | undefined,
    entityName: string | undefined,
    pan: string | undefined,
    loanAmount: number | undefined,
    emailId: string | undefined,
    mobileNo: string | undefined
  }) {
  if(request.mobileNo) {
    const token = await getToken()
    return fetch(`${apiEndpoint}/api/partners/${request.partnerId}/sendConsent`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    });
  }
  
}
export { sendOtp, sendConsent };