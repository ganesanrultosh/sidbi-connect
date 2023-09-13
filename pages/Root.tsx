import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import React from "react";
import Login from "./Login";

const Root = () => {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Sign out" component={Login} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default Root;