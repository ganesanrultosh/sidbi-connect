import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import RegisterBasicInfo from './src/pages/RegisterBasicInfo';
import RegisterContactInfo from './src/pages/RegisterContactInfo';
import Register from './src/pages/Register';
import { RootSiblingParent } from 'react-native-root-siblings';
import LeadBasicInfo from './src/pages/LeadBasicInfo';
import { DefaultTheme, Provider } from 'react-native-paper';
import LeadContactInfo from './src/pages/LeadContactInfo';
import LeadSubmission from './src/pages/LeadSubmission';
import ForgotPassword from './src/pages/ForgotPassword';
import Leads from './src/pages/Leads';
import Root from './src/pages/Root';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined;
  RegisterBasicInfo: {partner: Partner | undefined};
  RegisterContactInfo: {partner: Partner | undefined};
  Register: {partner: Partner | undefined};
  Root: undefined;
  Home: undefined;
  SignOut: undefined;
  LeadBasicInfo: undefined;
  LeadContactInfo: undefined;
  Leads: undefined;
  LeadSubmission: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {

  return <Provider theme={DefaultTheme}><RootSiblingParent>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterBasicInfo" component={RegisterBasicInfo} />
        <Stack.Screen 
          name="RegisterContactInfo" 
          component={RegisterContactInfo} 
          />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>
        <Stack.Screen name="LeadBasicInfo" component={LeadBasicInfo} />
        <Stack.Screen name="LeadContactInfo" component={LeadContactInfo} />
        <Stack.Screen name="Leads" component={Leads} />
        <Stack.Screen name="LeadSubmission" component={LeadSubmission} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  </RootSiblingParent>
  </Provider>
}


export default App;
