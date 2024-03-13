import OngoingLeads from '../partner/OngoingLeads';
import OngoingLeadsHeader from '../partner/OngoingLeadsHeader';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Footer from './Footer';
import React, {useEffect, useState} from 'react';
import HomeNavIcons from './HomeNavIcons';
import {Surface} from 'react-native-paper';
import OngoingSiteVisits from '../visit/OngoingSiteVisits';
import OngoingSiteVisitsHeader from '../visit/OngoingSiteVisitHeaders';
import useToken from '../../components/Authentication/useToken';

const Home = () => {
  const {getUserType, getUserRole} = useToken();

  const [userType, setUserType] = useState<string>();

  useEffect(() => {
    getUserType().then(data => {
      setUserType(data);
      console.log('usertype', data);
    });

    getUserRole().then(data => {
      console.log('Home comp', data);
    });
  }, []);
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FCFAFE'}}>
        <SafeAreaView style={{flex: 1}}>
          <HomeNavIcons />
          <>
            {userType === 'TPE' && <OngoingLeads />}
            {userType === 'EMPLOYEE' && <OngoingSiteVisits />}
          </>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Home;

// Footer comp
{
  /* <View>
      <Footer />
    </View> */
}
