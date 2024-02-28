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
    <View style={{ flex: 1, backgroundColor: "#FCFAFE" }}>
      <ScrollView>
        <HomeNavIcons />
        <View>
          
          <OngoingLeads />
         
          <OngoingSiteVisits />
         </View>
      </ScrollView>
    </View>
    {/* <View>
      <Footer />
    </View> */}
  </>

}

export default Home;