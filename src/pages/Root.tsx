import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import React from "react";
import Login from "./Login";
import { RootStackParamList } from "../../Navigation";

const Root = () => {

  const Drawer = createDrawerNavigator<RootStackParamList>();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{ 
          title: 'SIDBI Connect',
          headerStyle: {
            backgroundColor: "#2F5596",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }} />
      <Drawer.Screen name="SignOut" component={Login} options={{
      headerShown: false,
      headerShadowVisible: false,
      headerLeftLabelVisible: false
    }}/>
    </Drawer.Navigator>
  );
}

export default Root;