import OngoingSiteVisits from "./OngoingSiteVisits";
import OngoingSiteVisitsHeader from "./OngoingSiteVisitsHeader";
import OngoingLeads from "./OngoingLeads";
import OngoingLeadsHeader from "./OngoingLeadsHeader";
import { ScrollView, Text, View } from "react-native";
import Footer from "./Footer";
import React from "react";

const Home = () => {
  return <><View style={{ flex: 1 }}>
    <ScrollView>
      <OngoingSiteVisitsHeader />
      <OngoingSiteVisits />
      <OngoingLeadsHeader />
      <OngoingLeads />
    </ScrollView>
  </View>
    <View>
      <Footer/>
    </View></>

}

export default Home;