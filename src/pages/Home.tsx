import OngoingLeads from "./OngoingLeads";
import OngoingLeadsHeader from "./OngoingLeadsHeader";
import { ScrollView, View } from "react-native";
import Footer from "./Footer";
import React from "react";
import HomeNavIcons from "./HomeNavIcons";
import Feed from "./Feed";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Home = () => {
  return <>
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HomeNavIcons />
        <OngoingLeadsHeader />
        <OngoingLeads />
      </ScrollView>
    </View>
    {/* <View>
      <Footer />
    </View> */}
  </>

}

export default Home;