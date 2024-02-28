import {Pressable, ScrollView, Text, View, Dimensions} from 'react-native';
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

const OngoingLeads = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [leadsArray, setLeadsArray] = useState([] as Array<Lead | undefined>);

  const {leads} = useAppSelector(state => state.persistedLeads);

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
        <Card style={styles.leadCard}>
          <Card.Content style={styles.contentWrapper}>
            <View style={styles.contentContainer}>
              <View style={styles.cardDetails}>
                <View style={styles.cardHeader}>
                  <View style={styles.customerNameContainer}>
                    <Paragraph
                      numberOfLines={2}
                      style={{
                        fontSize: 18,
                        color: '#2F5596',
                        fontWeight: '600',
                      }}>
                      {props.entityName}
                      {/* Lorem, ipsum dolor sit amet consectetur */}
                    </Paragraph>
                  </View>
                  <View style={styles.deleteIconContainer}>
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
                </View>
                <Paragraph style={{fontSize: 14}}>
                  {props.dateCreated}
                </Paragraph>
                <View style={styles.loanDetails}>
                  <Paragraph style={{fontSize: 16, fontWeight: '500', flex: 1}}>
                    Amount: {props.loanAmount} lakh
                  </Paragraph>
                  <Paragraph style={{fontSize: 16, fontWeight: '500', flex: 1}}>
                    Type: {props.loanType}
                  </Paragraph>
                </View>
                {props.mobileNo && (
                  <View style={styles.mobileNoContainer}>
                    <View>
                      <FontAwesome6
                        name={'phone'}
                        solid
                        size={18}
                        style={{color: '#2F5596'}}
                        onPress={() => {
                          Linking.openURL(`tel:${props?.mobileNo}`);
                        }}
                      />
                    </View>
                    <View>
                      <Text style={{fontWeight: '500', fontSize: 14}}>
                        {props.mobileNo}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.continueButton}
                labelStyle={{fontSize: 14}}
                mode="contained"
                onPress={() => {
                  navigation.navigate('LeadBasicInfo', {lead: props as Lead});
                }}>
                Continue
              </Button>
            </View>
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

  if (leadsArray.length === 0) {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Ongoing Leads</Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{fontSize: 16}} numberOfLines={3}>
            No ongoing leads found. Please create a new lead by clicking "Lead
            Generation" icon above.
          </Text>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Ongoing Leads</Text>
        </View>
        {
          <View style={{width: screenWidth, flexDirection: 'row'}}>
            <View
              style={{
                width: (screenWidth * 0.15) / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome6
                name={'caret-left'}
                light
                size={40}
                style={{
                  color: '#a1a1aa',
                }}
              />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{padding: 8, columnGap: 12}}
              decelerationRate={0}
              snapToAlignment={'center'}
              snapToInterval={screenWidth * 0.8}>
              {getLeads()}
            </ScrollView>
            <View
              style={{
                width: (screenWidth * 0.15) / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome6
                name={'caret-right'}
                light
                size={40}
                style={{
                  color: '#a1a1aa',
                }}
              />
            </View>
          </View>
        }
      </>
    );
  }
};

export default OngoingLeads;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3f7ebb',
  },
  leadCard: {
    width: screenWidth * 0.8,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.2,
  },
  contentWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
  },
  cardDetails: {
    width: '100%',
    flexDirection: 'column',
    rowGap: 3,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
  },
  customerNameContainer: {
    width: '85%',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loanDetails: {
    width: '100%',
    flexDirection: 'row',
  },
  mobileNoContainer: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    columnGap: 12,
  },
  deleteIconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  continueButton: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#2F5596',
    borderRadius: 50,
  },
});
