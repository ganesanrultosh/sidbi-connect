import Config from 'react-native-config';
import useToken from '../components/Authentication/useToken';

const apiEndpoint = Config.REACT_APP_API_ENDPOINT;

console.log("End point: ", apiEndpoint);

const { getToken } = useToken()

async function me() {
  const token = await getToken()
  return fetch(`${apiEndpoint}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
}

function loginUser(credentials: {
  username: string;
  password: string;
  saltkey: string;
}) {
  console.log('loginUser')
  return fetch(`${apiEndpoint}/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

async function forgotPassword(request: { username: string }) {
  return fetch(`${apiEndpoint}/auth/forgotpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

async function signupUser(signupInput: Partner) {
  return fetch(`${apiEndpoint}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupInput),
  })
}

async function randomKeys(key: string) {
  return fetch(`${apiEndpoint}/auth/randomKeys/${key}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
}

async function setUserPassword(credentials: {
  password: string;
  matchingPassword: string;
  token: string;
}) {
  return fetch(`${apiEndpoint}/auth/setpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

export { me, loginUser, forgotPassword, signupUser, setUserPassword, randomKeys };