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
import { DefaultTheme, MD3LightTheme, Provider } from 'react-native-paper';
import LeadContactInfo from './src/pages/LeadContactInfo';
import LeadSubmission from './src/pages/LeadSubmission';
import ForgotPassword from './src/pages/ForgotPassword';
import Leads from './src/pages/Leads';
import Root from './src/pages/Root';
import { Lead } from './src/models/Lead';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Login: undefined;
  RegisterBasicInfo: { partner: Partner | undefined };
  RegisterContactInfo: { partner: Partner | undefined };
  Register: { partner: Partner | undefined };
  Root: undefined;
  Home: undefined;
  SignOut: undefined;
  LeadBasicInfo: { lead: Lead | undefined };
  LeadContactInfo: { lead: Lead | undefined };
  LeadSubmission: { lead: Lead | undefined };
  Leads: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation(): JSX.Element {

  const theme = {
    ...MD3LightTheme,
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#2F5596",
      secondaryContainer: "#E1EAF4",
      onBackground: "black",
      elevation: {
        ...MD3LightTheme.colors.elevation,
        level0: "#FFFFFF",
        level2: "#FAFAFA",
        level4: "#FAFAFA"
      },
      background: "#FAFAFA"
    },
  };

  const navigatinTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'red'
    },
  }

  const headerFormat = {
    headerStyle: {
      backgroundColor: "#2F5596",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  return <Provider theme={theme}><RootSiblingParent>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{
          headerStyle: {
            backgroundColor: "#2F5596",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false
        }}>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="RegisterBasicInfo" component={RegisterBasicInfo} options={{
            title: 'Registration'
          }} />
          <Stack.Screen
            name="RegisterContactInfo"
            component={RegisterContactInfo}
            options={{ title: 'Registration' }}
          />
          <Stack.Screen name="Register" component={Register} options={{ title: 'Registration' }} />
          <Stack.Screen name="LeadBasicInfo" component={LeadBasicInfo} options={{ title: 'Lead Generation' }} />
          <Stack.Screen name="LeadContactInfo" component={LeadContactInfo} options={{ title: 'Lead Generation' }} />
          <Stack.Screen name="Leads" component={Leads} />
          <Stack.Screen name="LeadSubmission" component={LeadSubmission} options={{ title: 'Lead Generation' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Group>
        <Stack.Group screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  </RootSiblingParent>
  </Provider>
}


export default Navigation;
