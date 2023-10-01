import Config from 'react-native-config';

const apiEndpoint = Config.REACT_APP_API_ENDPOINT;

console.log("End point: ", apiEndpoint);

async function forgotPassword(request: { username: string }) {
  return fetch(`${apiEndpoint}/auth/forgotpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

function loginUser(credentials: {
  username: string;
  password: string;
}) {
  return fetch(`${apiEndpoint}/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
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

export { forgotPassword, loginUser, signupUser, setUserPassword };