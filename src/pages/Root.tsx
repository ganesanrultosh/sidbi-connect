import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import React from "react";
import Login from "./Login";
import { RootStackParamList } from "../../App";

const Root = () => {

  const Drawer = createDrawerNavigator<RootStackParamList>();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="SignOut" component={Login} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default Root;