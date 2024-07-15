import Config from 'react-native-config';
import useToken from '../components/Authentication/useToken';
import encrypt from '../utils/encrypt';

const apiEndpoint = Config.REACT_APP_CONNECT_API_ENDPOINT;
const visitApiEndpoint = Config.REACT_APP_VISIT_API_ENDPOINT;

console.log("End point: ", apiEndpoint);

const { getToken } = useToken()

async function me() {
  const token = await getToken()
  console.log("Me function -------", `${apiEndpoint}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  return fetch(`${apiEndpoint}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
}


async function verifyUser() {
  const token = await getToken()

  // console.log("token for the number", token);

  return fetch(`${visitApiEndpoint}/api/users/me`, {
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

function generateOtp(mobileNo: string) {
  console.log('loginUser')
  return fetch(`${visitApiEndpoint}/auth/${mobileNo}/otp/generate`, {
    method: "POST",
  });
}

function loginEmployee(credentials: {
  mobileNo: string,
  otp: string
}) {
  console.log('loginEmployee')
  return fetch(`${visitApiEndpoint}/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.mobileNo,
      password: encrypt(credentials.otp)
    }),
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

// de-register user
async function deRegister(request: { username: string }){

  const token = await getToken();

  return fetch(`${apiEndpoint}/api/users/deRegister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
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

async function profile () {
  const token = await getToken()
  return fetch(`${visitApiEndpoint}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
}

export { me, loginUser, forgotPassword, signupUser, deRegister, setUserPassword, randomKeys, verifyUser, generateOtp, loginEmployee, profile, };