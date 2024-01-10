import Config from 'react-native-config';
import useToken from '../components/Authentication/useToken';
const apiEndpoint = Config.REACT_APP_CONNECT_API_ENDPOINT;

const BranchServices = {
  getBranches: async (lat: any, lng: any) : Promise<string[] | undefined> => {
    const { getToken } = useToken()
    try {
      const token = await getToken()
      console.log(`${apiEndpoint}/open/master/getBranchLatLngData?locLat=${lat}&locLng=${lng}&from=2`)
      return await fetch(`${apiEndpoint}/open/master/getBranchLatLngData?locLat=${lat}&locLng=${lng}&from=2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }).then(response => response.json())
        .then(branches => {
          console.log('branches', branches.listOfBranch)
          return branches.listOfBranch;
        }).catch((error) => {
          console.log(error);
          return undefined;
        });
    } catch (error: any) {
      console.log(error)
      return undefined;
    }
    
  },
};

export default BranchServices;

