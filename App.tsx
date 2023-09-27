import 'react-native-gesture-handler';
import React from 'react';
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import RegisterBasicInfo from './src/pages/RegisterBasicInfo';
import RegisterContactInfo from './src/pages/RegisterContactInfo';
import Register from './src/pages/Register';
import { RootSiblingParent } from 'react-native-root-siblings';
import Home from './src/pages/Home';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LeadBasicInfo from './src/pages/LeadBasicInfo';
import { DefaultTheme, Provider } from 'react-native-paper';
import LeadContactInfo from './src/pages/LeadContactInfo';
import LeadSubmission from './src/pages/LeadSubmission';
import ForgotPassword from './src/pages/ForgotPassword';
import Leads from './src/pages/Leads';
import OpenDrawer from './src/pages/OpenDrawer';
import Root from './src/pages/Root';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return <Provider theme={DefaultTheme}><RootSiblingParent>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration: Basic Information" component={RegisterBasicInfo} />
        <Stack.Screen name="Registration: Contact Information" component={RegisterContactInfo} />
        <Stack.Screen name="Registration" component={Register} />
        <Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>
        <Stack.Screen name="Lead: Basic Information" component={LeadBasicInfo} />
        <Stack.Screen name="Lead: Contact Information" component={LeadContactInfo} />
        <Stack.Screen name="Leads" component={Leads} />
        <Stack.Screen name="Lead: Submission" component={LeadSubmission} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  </RootSiblingParent>
  </Provider>
}


export default App;
