import {ScrollView, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Button, Surface, Tooltip, useTheme} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigation} from '@react-navigation/native';
import Visit from '../../models/visit/visit';
import { deleteVisit } from '../../slices/visitCacheSlice';
import decrypt from '../../utils/decrypt';

const OngoingSiteVisits = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {visits} = useAppSelector(state => state.persistedVisists);

  useEffect(() => {
    console.log('ongoing leads', visits);
  }, [visits]);

  function getCards(): React.ReactNode {
    let keys: string[] = [];
    let keysHandled = Object.keys(visits).length;

    if (Object.keys(visits).length === 0) {
      return (
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              flex: 1,
              flexWrap: 'wrap',
            }}
            numberOfLines={3}>
            No ongoing leads found. Please create a new lead by clicking "Lead
            Generation" icon above.
          </Text>
        </View>
      );
    } else {
      return Object.keys(visits).map(key => {
        keys.push(key);
        if (
          keys.length === 2 ||
          keysHandled === 1 ||
          Object.keys(visits).length === 2
        ) {
          keysHandled -= 2;
          let twoCards = getTwoCards(keys);
          keys = [];
          return twoCards;
        }
      });
    }
  }

  function getTwoCards(keys: string[]) {
    console.log('Two cards', keys)
    let visit1: Visit | undefined = visits[keys[0]].visit;
    let visit2: Visit | undefined =
      keys.length == 2 ? visits[keys[1]].visit : undefined;
    return (
      <View key={`${visit1.customer.pan + visit1.report.reportId + visit2?.customer.pan + visit2?.report.reportId}`}>
        {visit1 && getLeadSurface(visit1)}
        {visit2 && getLeadSurface(visit2)}
      </View>
    );
  }

  const getBgColor = (status: string | undefined) => {
    if (status === 'created') {
      return '#FFFDF7';
    } else if (status === 'submitted') {
      return '#FEF6F0';
    } else if (status === 'synced') {
      return '#d9ead3';
    } else if (status === 'syncfailure') {
      return '#FFFDF7';
    // } else if (status === '4') {
    //   return '#FEF6F0';
    // } else if (status === '5') {
    //   return '#F8F6F0';
    }
  };

  const getStatus = (status: string) => {
    switch(status) {
      case "synced":
        return "Visit synchronized."
      case "submitted":
        return "Yet to be synchronized"
      case "syncfailure":
        return "Syncronization failure"
      default:
        return ""
    } 
  }

  function getLeadSurface(visit: Visit) {
    return (
      <Surface
        key={`${visit.customer.pan + visit.report.reportId}`}
        elevation={2}
        style={{
          margin: 10,
          padding: 10,
          paddingHorizontal: 15,
          width: 200,
          minHeight: 150,
          backgroundColor: getBgColor(visit.status)
        }}>
        <Text
          style={{fontWeight: 'bold', color: 'black', fontSize: 20, flex: 1}}
          numberOfLines={1}>
          {visit.customer?.name}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 14, paddingVertical: 5}}>
          {decrypt(visit.customer.pan)}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 16, paddingVertical: 5}}>
          {visit.report.reportTitle}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 12}}>
          {visit.dateCreated}
        </Text>
        {visit.status === 'created' && <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <View style={{flex: 1, alignSelf: 'center'}}>
            <Button
              onPress={() => {
                dispatch(deleteVisit(visit));
              }}>
              Delete
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button
              onPress={() => {
                navigation.navigate('VisitReport', {visit: visit}) }}>
              Continue
            </Button>
          </View>
        </View>}
        {visit.status !== 'created' && <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <View style={{flex: 1, alignSelf: 'center', paddingVertical: 10}}>
            <Tooltip title={visit.error || getStatus(visit.status)}>
              <Text style={{fontWeight: "bold"}}>{getStatus(visit.status)}</Text>
            </Tooltip>
          </View>
        </View>}
      </Surface>
    );
  }

  if (Object.keys(visits).length === 0) {
    return (
      <View style={{paddingHorizontal: 25, flexDirection: 'row'}}>
        <Text
          style={{
            flex: 1,
            flexWrap: 'wrap',
          }}
          numberOfLines={3}>
          No ongoing visit report found. Please create a new visit report by clicking "Site Visits" icon above.
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        {
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={200} //your element width
            snapToAlignment={'center'}
            style={{paddingHorizontal: 15}}>
            {getCards()}
          </ScrollView>
        }
      </View>
    );
  }
};

export default OngoingSiteVisits;
