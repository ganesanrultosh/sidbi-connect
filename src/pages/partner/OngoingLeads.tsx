import {
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, useTheme, Card, Paragraph} from 'react-native-paper';
import {RootState} from '@reduxjs/toolkit/query';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Lead} from '../../models/partner/Lead';
import {useNavigation} from '@react-navigation/native';
import {deleteLead} from '../../slices/leadCacheSlice';
import {StyleSheet} from 'react-native';
import {createEntityAdapter} from '@reduxjs/toolkit';
import useToken from '../../components/Authentication/useToken';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const OngoingLeads = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [leadsArray, setLeadsArray] = useState([] as Array<Lead | undefined>);

  const {leads} = useAppSelector(state => state.persistedLeads);

  const {getToken, getUserType} = useToken();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // getToken().then(data => {
      //   console.log('currentUser from ongoingLeads', data);
      // });
      // getUserType().then(data => {
      //   console.log('usertype from ongoingLeads', data);
      // });
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (leads) {
        let keys: string[] = Object.keys(leads);
        let dataArray: Array<Lead | undefined> = [];
        keys.forEach((k: string) => {
          if (k) {
            if (leads[k]) {
              dataArray.push(leads[k]['lead']);
            }
          }
        });
        setLeadsArray(dataArray);
      }
    }

    return () => {
      mounted = false;
    };
  }, [leads]);

  const LeadCard = (props: Lead) => {
    return (
      <>
        <Card
          onPress={() => {
            navigation.navigate('LeadBasicInfo', {lead: props as Lead});
          }}
          style={styles.leadCard}>
          <Card.Content style={[styles.cardContentFirst]}>
            <View style={[styles.cardContentFirstWrapper]}>
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                  {props.entityName}
                </Text>
              </View>
              <View style={{}}>
                <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                  Amount: {props.loanAmount} lakh
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                  Type: {props.loanType}
                </Text>
              </View>
            </View>
            <View style={[styles.cardContentFirstRight]}>
              <View style={[styles.deleteIconContainer, {marginBottom: 10}]}>
                <FontAwesome6
                  name={'trash-can'}
                  solid
                  size={20}
                  style={{color: '#36454F'}}
                  onPress={() => {
                    dispatch(deleteLead(props.pan));
                  }}
                />
              </View>
              <Text style={[styles.cardDate]}>{props.dateCreated}</Text>
              {props.mobileNo && (
                <View
                  style={[
                    styles.mobileNoContainer,
                    {justifyContent: 'center'},
                  ]}>
                  <Text
                    style={{fontWeight: '500', fontSize: 14, color: '#000'}}>
                    {props.mobileNo}
                  </Text>
                  <View>
                    <FontAwesome6
                      name={'phone'}
                      solid
                      size={16}
                      style={{color: '#2F5596'}}
                      onPress={() => {
                        Linking.openURL(`tel:${props?.mobileNo}`);
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </Card.Content>
          <Card.Content style={[styles.cardContentSecond]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LeadBasicInfo', {lead: props as Lead});
              }}
              style={[styles.cardContentTouchable]}>
              <Text style={[styles.touchableText]}>Continue</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </>
    );
  };

  const getLeads = (): React.ReactNode => {
    return (
      <>
        {leadsArray.map((item, index) => (
          <LeadCard key={'lead' + index} {...item} />
        ))}
      </>
    );
  };

  // leadsArray.length === 0
  if (leadsArray.length === 0) {
    return (
      <>
        <View style={{marginTop: 20}}>
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
            <Text style={{fontSize: 16, color: '#000'}} numberOfLines={3}>
              No ongoing leads found. Please create a new lead by clicking "Lead
              Generation" icon above.
            </Text>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={[styles.screenWrapper]}>
          <ScrollView
            style={{flex: 1, marginBottom: 15}}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={[styles.scrollContentContainer]}
            decelerationRate={0}>
            {getLeads()}
          </ScrollView>
        </View>
      </>
    );
  }
};

export default OngoingLeads;

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '100%',
  },
  scrollContentContainer: {
    borderTopColor: '#475569',
    borderTopWidth: 1.5,
    padding: 10,
    rowGap: 25,
    alignItems: 'center',
  },
  leadCard: {
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 12,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
  },
  cardContentFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
    columnGap: 5,
    paddingTop: 0,
  },
  cardContentFirstWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 5,
  },
  cardContentFirstRight: {
    width: '42%',
    height: 120 - 16,
    flexDirection: 'column',
    rowGap: 12,
  },
  deleteIconContainer: {
    alignItems: 'flex-end',
  },
  cardDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  cardContentSecond: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#2A4B86',
    paddingBottom: 0,
  },
  cardContentTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  touchableText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  mobileNoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
});
