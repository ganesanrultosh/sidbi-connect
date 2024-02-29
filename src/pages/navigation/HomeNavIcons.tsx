import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
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
  });

  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          padding: 10,
          columnGap: 10,
          backgroundColor: '#f4f4f5',
        }}
        decelerationRate={0}
        snapToAlignment={'center'}>
        {/* Lead Generation */}
        <TouchableOpacity
          onPress={() => {
            if (userType === 'TPE') {
              navigation.navigate('LeadBasicInfo', {lead: {} as Lead});
            } else {
              Toast.show(
                'Only facilitators are allowed to create leads at the moment.',
              );
            }
          }}>
          <Card style={styles.Card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconWrapper}>
                <FontAwesome6
                  name={'handshake'}
                  size={40}
                  color="#2F5596"
                  sharpSolid
                />
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>Lead</Text>
                <Text style={styles.titleText}>Generation</Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        {/* Site Visits */}
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
          }}>
          <Card style={styles.Card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconWrapper}>
                <FontAwesome6
                  name={'building'}
                  size={40}
                  color="#2F5596"
                  sharpSolid
                />
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>Site</Text>
                <Text style={styles.titleText}>Visits</Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        {/* View Leads */}
        <TouchableOpacity
          onPress={() => {
            if (userType === 'TPE') {
              navigation.navigate('Leads' as never);
            } else {
              Toast.show(
                'Only facilitators are allowed to view leads at the moment.',
              );
            }
          }}>
          <Card style={styles.Card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconWrapper}>
                <FontAwesome6
                  name={'users-viewfinder'}
                  size={40}
                  color="#2F5596"
                  sharpSolid
                />
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>View</Text>
                <Text style={styles.titleText}>Leads</Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: (screenWidth - 40) / 3,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  titleWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#334155',
  },
});

export default HomeNavIcons;
