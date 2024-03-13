import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
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
import encrypt from '../../utils/encrypt';
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

      // const encryptedValue = encrypt('8558');
      // console.log('encrypted value for otp', encryptedValue);
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
          onPress={() => {
            navigation.navigate('VisitReport', {visit: props as Visit});
          }}
          style={[
            styles.leadCard,
            {backgroundColor: getBgColor(props.status)},
          ]}>
          <Card.Content style={[styles.contentFirst]}>
            <View style={[styles.firstContentWrapper]}>
              <View style={[styles.customerNameContainer]}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  {props.customer?.name}
                  {/* Lorem, ipsum dolor sit amet consectetur */}
                </Text>
              </View>
              {props.status !== 'created' && (
                <View style={styles.firstContentBody}>
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    {getStatus(props.status)}
                  </Text>
                  {props.status !== 'synced' && (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(postVisitTrigger({visit: props}));
                      }}>
                      <Text style={{color: '#2F5596', fontSize: 14}}>Sync</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {props.status === 'syncfailure' && (
                <Text style={{fontWeight: 'bold', fontSize: 12, color: 'red'}}>
                  {props.error}
                </Text>
              )}
            </View>
            <View style={[styles.panContainer]}>
              {props.status === 'created' && (
                <View
                  style={{
                    alignItems: 'flex-end',
                    height: 30,
                  }}>
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
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '500',
                }}>
                PAN No
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '500',
                }}>
                {decrypt(props.customer.pan)}
              </Text>
            </View>
          </Card.Content>
          <Card.Content style={[styles.contentSecond]}>
            <Text style={[styles.reportTitle]}>
              {props.report.reportTitle}
              {/* Pre-Sanction Report - Express 2.0 */}
              {/* JAKs Video Visit Format FoS/SIDBI */}
            </Text>

            <Text style={[styles.reportDateCreated]}>{props.dateCreated}</Text>
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
        <View style={{marginTop: 20}}>
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
            <Text style={{fontSize: 16, color: '#000'}} numberOfLines={3}>
              No ongoing visits found. Please create a new visit by clicking
              "Site Visits" icon above.
            </Text>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        {
          <View style={[styles.screenWrapper]}>
            <ScrollView
              style={{flex: 1, marginBottom: 15}}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={[styles.scrollContentContainer]}
              decelerationRate={0}>
              {getVisits()}
            </ScrollView>
          </View>
        }
      </>
    );
  }
};

export default OngoingSiteVisits;

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
    rowGap: 20,
    alignItems: 'center',
  },
  leadCard: {
    width: screenWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.2,
  },
  contentFirst: {
    height: 110,
    flexDirection: 'row',
    columnGap: 2,
  },
  firstContentWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  customerNameContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstContentBody: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  panContainer: {
    width: '35%',
  },
  contentSecond: {
    height: 65,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    columnGap: 5,
    backgroundColor: '#2A4B86',
  },
  reportTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  reportDateCreated: {
    width: '28%',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
