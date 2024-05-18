import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Surface} from 'react-native-paper';
import {useListLeadsQuery} from '../../slices/leadSlice';
import {me} from '../../services/authService';
import {skipToken} from '@reduxjs/toolkit/query';
const {height: screenHeight} = Dimensions.get('window');

const Leads = () => {
  const [partnerId, setPartnerId] = useState<number>();

  const {
    data: leads,
    isFetching,
    isError,
    error,
  } = useListLeadsQuery(partnerId || skipToken);

  useEffect(() => {
    me()
      .then(response => response.json())
      .then((partner: Partner) => {
        setPartnerId(partner.id);
      });
  }, []);

  let statusDomain = [
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'Processing',
      value: 'Processing',
    },
    {
      label: 'Ready',
      value: 'Ready',
    },
    {
      label: 'All',
      value: 'All',
    },
  ];

  const getBgColor = (status: string | undefined) => {
    if (status === '0') {
      return '#FFFDF7';
    } else if (status === '1') {
      return '#FEF6F0';
    } else if (status === '2') {
      return '#F8F6F0';
    } else if (status === '3') {
      return '#FFFDF7';
    } else if (status === '4') {
      return '#FEF6F0';
    } else if (status === '5') {
      return '#F8F6F0';
    }
  };

  const getColor = (status: string | undefined) => {
    if (status === '0') {
      return '#ffcd3d';
    } else if (status === '1') {
      return '#d88b5d';
    } else if (status === '2') {
      return '#6f8661';
    } else if (status === '3') {
      return '#ffcd3d';
    } else if (status === '4') {
      return '#d88b5d';
    } else if (status === '5') {
      return '#6f8661';
    }
  };

  const getStatus = (status: string | undefined) => {
    if (status === '0') {
      return 'Lead Created';
    } else if (status === '1') {
      return 'Application Filing Started';
    } else if (status === '2') {
      return 'Application Filed';
    } else if (status === '3') {
      return 'Appraisal In Progress';
    } else if (status === '4') {
      return 'Sanctioned';
    } else if (status === '5') {
      return 'Application Rejected';
    }
  };

  const styles = StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#FCFAFE',
    },
    scrollContainer: {
      width: '100%',
      alignItems: 'center',
      rowGap: 12,
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    Card: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 0.2,
    },
    cardContent: {
      width: '100%',
    },
    // cell: {
    //   overflow: 'visible',
    //   whiteSpace: 'normal',
    // },
  });

  return (
    <View style={[styles.screenWrapper, {paddingBottom: 15}]}>
      <ScrollView
        decelerationRate={0}
        snapToAlignment={'center'}
        contentContainerStyle={styles.scrollContainer}>
        {!error && !isFetching && (!leads || leads?.length == 0) && (
          <View style={[styles.Card, {backgroundColor: '#FFFFED'}]}>
            <Text style={{color: 'red'}}>No Leads Found !</Text>
          </View>
        )}
        {isFetching && (
          <View style={[styles.Card, {backgroundColor: '#FFFFED'}]}>
            <Text style={{color: 'red'}}>Fetching Leads...</Text>
          </View>
        )}
        {error && (
          <View style={[styles.Card, {backgroundColor: '#FFFFED'}]}>
            <Text style={{color: 'red'}}>
              Error fetching leads! {JSON.stringify(error)}
            </Text>
          </View>
        )}
        {!error && !isFetching && (!leads || leads?.length > 0) && (
          <Card style={[styles.Card]}>
            <Card.Content style={styles.cardContent}>
              <Text
                style={{fontSize: 16, color: '#4b5563', fontStyle: 'italic'}}>
                Following leads are successfully created. Facilitator can
                complete the application for assistance by visiting{' '}
                <Text
                  style={{color: 'blue'}}
                  onPress={() =>
                    Linking.openURL(
                      'https://onlineloanappl.sidbi.in/OnlineApplication/tpeLogin?fromLogin=true',
                    )
                  }>
                  SIDBI online application
                </Text>
              </Text>
            </Card.Content>
          </Card>
        )}
        {leads?.map(lead => {
          return (
            <Card key={`surface-${lead.id}`} style={styles.Card}>
              <Card.Content style={styles.cardContent}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 3}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: 18,
                      }}>
                      {lead.entityName}
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      {lead.dateCreated}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: 15,
                      }}>
                      Loan Amount: ₹ {lead.loanAmount} lakhs
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: 15,
                      }}>
                      Type: {lead.loanType}
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        height: 30,
                        alignItems: 'center',
                        columnGap: 10,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                        }}>
                        {lead.mobileNo}
                      </Text>
                      <FontAwesome6
                        name={'phone'}
                        solid
                        onPress={() => {
                          Linking.openURL(`tel:${lead.mobileNo}`);
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flex: 2}}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>
                      <Text>ID:</Text> {lead.id}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: `${getColor(lead.leadStatus)}`,
                      }}>
                      {getStatus(lead.leadStatus)}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Leads;
