import OngoingLeads from "../partner/OngoingLeads";
import OngoingLeadsHeader from "../partner/OngoingLeadsHeader";
import { ScrollView, View } from "react-native";
import Footer from "./Footer";
import React from "react";
import HomeNavIcons from "./HomeNavIcons";
import { Surface } from "react-native-paper";
import OngoingSiteVisits from "../visit/OngoingSiteVisits";
import OngoingSiteVisitsHeader from "../visit/OngoingSiteVisitHeaders";

const Home = () => {
  return <>
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <ScrollView>
        <HomeNavIcons />
        <Surface elevation={0} style={{paddingBottom: 15}}>
          <OngoingLeadsHeader />
          <OngoingLeads />
          <OngoingSiteVisitsHeader />
          <OngoingSiteVisits />
        </Surface>
      </ScrollView>
    </View>
    {/* <View>
      <Footer />
    </View> */}
  </>

}

export default Home;