import EncryptedStorage from 'react-native-encrypted-storage';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';

export default function useToken() {
  const tokenKey = "sidbi-connect-token";
  const getToken = async () => {
    const tokenString = await EncryptedStorage.getItem(tokenKey);
    if (tokenString !== undefined && tokenString !== "undefined") {
      const userToken = tokenString && JSON.parse(tokenString);
      return userToken && userToken?.currentUser;
    } else {
      EncryptedStorage.removeItem(tokenKey);
    }
  };

  const getUserType = async () => {
    const tokenString = await EncryptedStorage.getItem(tokenKey);
    if (tokenString !== undefined && tokenString !== "undefined") {
      const userToken = tokenString && JSON.parse(tokenString);
      return userToken && userToken?.userType;
    } else {
      EncryptedStorage.removeItem(tokenKey);
    }
  }

  const setUserType = async (userType: string) => {
    const tokenString = await EncryptedStorage.getItem(tokenKey);
    if (tokenString !== undefined && tokenString !== "undefined" && tokenString !== null) {
      let userToken = JSON.parse(tokenString);
      userToken.userType = userType;
      await EncryptedStorage.setItem(tokenKey, JSON.stringify(userToken));
    } else {
      console.log("Unable to set user type", tokenString)
      EncryptedStorage.removeItem(tokenKey);
    }
  }

  const setToken = async (userToken: { currentUser: string, userType: string } | undefined) => {
    if (!userToken) {
      await EncryptedStorage.removeItem(tokenKey);
    } else {
      console.log('setting new token', JSON.stringify(userToken))
      await EncryptedStorage.setItem(tokenKey, JSON.stringify(userToken));
    }
  };

  return {
    setToken,
    getToken,
    getUserType,
    setUserType,
  };
}
