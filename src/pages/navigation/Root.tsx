import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import React, { useState , useEffect} from 'react';
import Login from '../authentication/Login';
import {RootStackParamList} from '../../../Navigation';
import HomeHeader from '../../headers/HomeHeader';
import useToken from '../../components/Authentication/useToken';
import DeRegisterPage from './DeRegisterPage';

const Root = () => {
  const Drawer = createDrawerNavigator<RootStackParamList>();

  const {getUserType} = useToken();

  const [userType, setUserType] = useState<string>();

  useEffect(() => {
    getUserType().then(data => {
      setUserType(data);
    });
  }, []);


  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          header: ({navigation, route, options}) => {
            return <HomeHeader />;
          },
        }}
      />
      <Drawer.Screen
        name="SignOut"
        component={Login}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerLeftLabelVisible: false,
        }}
      />
      {userType === "TPE" && <>
      <Drawer.Screen
        name="DeRegister"
        component={DeRegisterPage}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerLeftLabelVisible: false,
        }}
      />
      </>}
    </Drawer.Navigator>
  );
};

export default Root;
