import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import {Lead} from '../../models/partner/Lead';
import useToken from '../../components/Authentication/useToken';
import Toast from 'react-native-root-toast';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const screenWidth = Dimensions.get('window').width;

const HomeNavIcons = () => {
  const navigation = useNavigation();

  const {getUserType} = useToken();

  const [userType, setUserType] = useState<string>();

  useEffect(() => {
    getUserType().then(data => {
      setUserType(data);
    });
  }, []);

  return (
    <>
      {userType === 'TPE' && (
        <>
          <View style={[styles.headerWrapper]}>
            <Card style={[styles.headerCard]}>
              <Card.Content style={[styles.headerCardContent]}>
                <TouchableOpacity
                  onPress={() => {
                    if (userType === 'TPE') {
                      navigation.navigate('LeadBasicInfo', {lead: {} as Lead});
                    } else {
                      Toast.show(
                        'Only facilitators are allowed to create leads at the moment.',
                      );
                    }
                  }}
                  style={[styles.headerTouchable]}>
                  <Image
                    style={[styles.headerCardImage]}
                    source={require('../../images/LeadGenerationIcon.png')}
                  />
                  <View style={{width: '100%'}}>
                    <Text style={[styles.headerCardText]}>Lead Generation</Text>
                  </View>
                </TouchableOpacity>
              </Card.Content>
            </Card>
            <Card style={[styles.headerCard]}>
              <Card.Content style={[styles.headerCardContent]}>
                <TouchableOpacity
                  onPress={() => {
                    if (userType === 'TPE') {
                      navigation.navigate('Leads' as never);
                    } else {
                      Toast.show(
                        'Only facilitators are allowed to view leads at the moment.',
                      );
                    }
                  }}
                  style={[styles.headerTouchable]}>
                  <Image
                    style={[styles.headerCardImage]}
                    source={require('../../images/ViewLeadsIcon.png')}
                  />
                  <View style={{width: '100%'}}>
                    <Text style={[styles.headerCardText]}>View Leads</Text>
                  </View>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
        </>
      )}
      {userType === 'EMPLOYEE' && (
        <>
          <View style={[styles.headerWrapper]}>
            <Card style={[styles.headerCard]}>
              <Card.Content style={[styles.headerCardContent]}>
                <TouchableOpacity
                  onPress={() => {
                    // console.log('userType', userType);
                    if (userType === 'EMPLOYEE') {
                      navigation.navigate('SiteVisitCustomerSearch');
                    } else {
                      Toast.show(
                        'Only employees are allowed to perform site visit at the moment.',
                      );
                    }
                  }}
                  style={[styles.headerTouchable]}>
                  <Image
                    style={[styles.headerCardImage]}
                    source={require('../../images/sitevisit.png')}
                  />
                  <View style={{width: '100%'}}>
                    <Text style={[styles.headerCardText]}>Site Visits</Text>
                  </View>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  headerCard: {
    height: 120,
    width: screenWidth * 0.4,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderRadius: 12,
  },
  headerCardContent: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  headerTouchable: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerCardImage: {
    width: '95%',
    height: 50,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  headerCardText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1e293b',
  },
});

export default HomeNavIcons;
