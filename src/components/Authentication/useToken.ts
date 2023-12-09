import EncryptedStorage from 'react-native-encrypted-storage';

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

  const setToken = async (userToken: { currentUser: string, userType: string } | undefined) => {
    if (!userToken) {
      await EncryptedStorage.removeItem(tokenKey);
    } else {
      await EncryptedStorage.setItem(tokenKey, JSON.stringify(userToken));
    }
  };

  return {
    setToken,
    getUserType,
    getToken
  };
}
