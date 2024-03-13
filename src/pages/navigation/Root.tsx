import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import React from 'react';
import Login from '../authentication/Login';
import {RootStackParamList} from '../../../Navigation';
import HomeHeader from '../../headers/HomeHeader';

const Root = () => {
  const Drawer = createDrawerNavigator<RootStackParamList>();

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
    </Drawer.Navigator>
  );
};

export default Root;
