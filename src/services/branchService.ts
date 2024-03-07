import Config from 'react-native-config';
import useToken from '../components/Authentication/useToken';
const apiEndpoint = Config.REACT_APP_CONNECT_API_ENDPOINT;

const BranchServices = {
  getBranches: async (lat: any, lng: any) : Promise<string[] | undefined> => {
    const { getToken } = useToken()
    try {
      const token = await getToken()
      console.log(`${apiEndpoint}/open/master/getBranchLatLngData?locLat=${lat}&locLng=${lng}&from=3`)
      return await fetch(`${apiEndpoint}/open/master/getBranchLatLngData?locLat=${lat}&locLng=${lng}&from=3`, {
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
  getLatLng: (address: string) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?region=IN&address=${address}&key=AIzaSyC-1bK9bzLlfvNhCB0VaCjN00YPr4dE2-Y`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
  }
};

export default BranchServices;

