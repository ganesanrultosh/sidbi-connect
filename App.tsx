import { Box, Button, Flex, Icon, Pressable, Surface, Text, TextInput, Wrap } from '@react-native-material/core';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import RegisterBasicInfo from './pages/RegisterBasicInfo';
import RegisterContactInfo from './pages/RegisterContactInfo';
import Register from './pages/Register';
import { RootSiblingParent } from 'react-native-root-siblings';
import OngoingLeads from './pages/OngoingLeads';
import Home from './pages/Home';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Lead from './pages/Lead';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return <RootSiblingParent>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration: Basic Information" component={RegisterBasicInfo} />
        <Stack.Screen name="Registration: Contact Information" component={RegisterContactInfo} />
        <Stack.Screen name="Registration" component={Register} />
        <Stack.Screen name="Home" component={Home} options={{
          headerTitleAlign: 'center',
          headerLeft: () => <FontAwesome6 name="bars" size={20} />,
          headerRight: () => <FontAwesome6 name="user" size={20} />
        }} />
        <Stack.Screen name="Lead" component={Lead} />
      </Stack.Navigator>
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  </RootSiblingParent>
}


export default App;
