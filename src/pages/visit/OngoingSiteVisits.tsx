import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  IconButton,
  Paragraph,
  Surface,
  Tooltip,
  useTheme,
} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Visit from '../../models/visit/visit';
import VisitCacheSlice, {deleteVisit} from '../../slices/visitCacheSlice';
import decrypt from '../../utils/decrypt';
import {postVisitTrigger} from '../../services/visitService';
const screenWidth = Dimensions.get('window').width;

const OngoingSiteVisits = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [visitsArray, setVisitsArray] = useState([] as Array<Visit>);

  const {visits} = useAppSelector(state => state.persistedVisists);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (visits) {
        let keys: string[] = Object.keys(visits);
        let dataArray: Array<Visit> = [];
        keys.forEach((k: string) => {
          if (k) {
            if (visits[k]) {
              dataArray.push(visits[k]['visit']);
            }
          }
        });
        // dataArray = [...dataArray, {...dataArray[0], ['status']: 'synced'}];
        setVisitsArray(dataArray);
      }
    }

    return () => {
      mounted = false;
    };
  }, [visits]);

  const getBgColor = (status: string | undefined) => {
    if (status === 'created') {
      return '#FFFDF7';
    } else if (status === 'submitted') {
      return '#FEF6F0';
    } else if (status === 'synced') {
      return '#d9ead3';
    } else if (status === 'syncfailure') {
      return '#FFFDF7';
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case 'synced':
        return 'Visit synchronized.';
      case 'submitted':
        return 'Yet to be synchronized';
      case 'syncfailure':
        return 'Syncronization failure';
      default:
        return '';
    }
  };

  const VisitCard = (props: Visit) => {
    return (
      <>
        <Card
          style={[
            styles.leadCard,
            {backgroundColor: getBgColor(props.status)},
          ]}>
          <Card.Content style={styles.contentWrapper}>
            <View style={styles.contentContainer}>
              <View style={[styles.cardDetails]}>
                <View style={styles.cardHeader}>
                  <View style={styles.customerNameContainer}>
                    <Paragraph
                      numberOfLines={2}
                      style={{
                        fontSize: 18,
                        color: '#2F5596',
                        fontWeight: '600',
                      }}>
                      {props.customer?.name}
                      {/* Lorem, ipsum dolor sit amet consectetur */}
                    </Paragraph>
                  </View>
                  {props.status === 'created' && (
                    <View style={styles.deleteIconContainer}>
                      <FontAwesome6
                        name={'trash-can'}
                        solid
                        size={20}
                        style={{color: '#36454F'}}
                        onPress={() => {
                          dispatch(deleteVisit(props));
                        }}
                      />
                    </View>
                  )}
                </View>
                <Paragraph style={{fontSize: 16, fontWeight: '500'}}>
                  {decrypt(props.customer.pan)}
                </Paragraph>
                <Paragraph style={{fontSize: 16, fontWeight: '500'}}>
                  {props.report.reportTitle}
                </Paragraph>
                <Paragraph style={{fontSize: 14}}>
                  {props.dateCreated}
                </Paragraph>
              </View>
            </View>
            {props.status === 'created' && (
              <View style={[styles.buttonContainer]}>
                <Button
                  style={styles.continueButton}
                  mode="contained"
                  onPress={() => {
                    navigation.navigate('VisitReport', {visit: props as Visit});
                  }}>
                  Continue
                </Button>
              </View>
            )}
            {props.status !== 'created' && (
              <>
                <View
                  style={[
                    styles.buttonContainer,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 0,
                    },
                  ]}>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    {getStatus(props.status)}
                  </Text>
                  {props.status !== 'synced' && (
                    <Button
                      onPress={() => {
                        dispatch(postVisitTrigger({visit: props}));
                      }}>
                      Sync
                    </Button>
                  )}
                </View>
                {props.status === "syncfailure" && <Text style={{fontWeight: 'bold', fontSize: 10, color: 'red'}}>
                  {props.error}
                </Text>}
              </>
            )}
          </Card.Content>
        </Card>
      </>
    );
  };

  const getVisits = (): React.ReactNode => {
    return (
      <>
        {visitsArray.map((item, index) => {
          return <VisitCard key={'visit' + index} {...item} />;
        })}
      </>
    );
  };

  if (visitsArray.length === 0) {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Ongoing Visits</Text>
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
          <Text style={styles.headerText}>Ongoing Visits</Text>
        </View>
        {
          <View
            style={{
              width: screenWidth,
              flexDirection: 'row',
              marginBottom: 12,
            }}>
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
              contentContainerStyle={{
                padding: 8,
                columnGap: 12,
              }}
              // how to set props for pagination?
              decelerationRate={0}
              snapToAlignment={'center'}
              snapToInterval={screenWidth * 0.8}>
              {getVisits()}
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

export default OngoingSiteVisits;

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
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loanDetails: {
    width: '100%',
    flexDirection: 'row',
  },
  // duplicated here for future reference
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
