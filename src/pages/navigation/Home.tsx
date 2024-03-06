import OngoingLeads from "../partner/OngoingLeads";
import OngoingLeadsHeader from "../partner/OngoingLeadsHeader";
import { ScrollView, View } from "react-native";
import Footer from "./Footer";
import React , {useEffect, useState} from "react";
import HomeNavIcons from "./HomeNavIcons";
import { Surface } from "react-native-paper";
import OngoingSiteVisits from "../visit/OngoingSiteVisits";
import OngoingSiteVisitsHeader from "../visit/OngoingSiteVisitHeaders";
import useToken from '../../components/Authentication/useToken';

const Home = () => {
	const {getUserType} = useToken();

  const [userType, setUserType] = useState<string>();

  useEffect(() => {
    getUserType().then(data => {
      setUserType(data);
    });
  }, []);
  return <>
    <View style={{ flex: 1, backgroundColor: "#FCFAFE" }}>
      <ScrollView>
        <HomeNavIcons />
        <View>
          
          <OngoingLeads />
         
            {userType === 'EMPLOYEE' && <OngoingSiteVisits />}
         </View>
      </ScrollView>
    </View>
    {/* <View>
      <Footer />
    </View> */}
  </>

}

export default Home;