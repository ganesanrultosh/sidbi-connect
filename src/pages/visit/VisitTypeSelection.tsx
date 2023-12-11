import React from 'react';
import {Text, View} from 'react-native';

import _reports from '../../../reports.json';
import ReportStructure from '../../models/visit/reportStructure/reportStructure';
import {Surface} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  VisitTypeSelectionProps,
  VisitTypeSelectionRouteProps,
} from '../navigation/NavigationProps';
import Report from '../../models/visit/reportStructure/report';
import Toast from 'react-native-root-toast';
import {useDispatch} from 'react-redux';
import {createVisit, visitLocalStoreSlice} from '../../slices/visitCacheSlice';
import {useAppSelector} from '../../app/hooks';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';
import Visit from '../../models/visit/visit';
import decrypt from '../../utils/decrypt';

const VisitTypeSelection = (props: VisitTypeSelectionProps) => {
  const reportStructure = _reports as ReportStructure;
  const navigation = useNavigation();
  const route = useRoute<VisitTypeSelectionRouteProps>();
  const {customer} = route.params;
  const {visits} = useAppSelector(state => state.persistedVisists);
  const dispatch = useDispatch();

  const getReportSurface = (report: Report) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('reportid', report.reportId);
          if (customer) {
            let reportToCreate: Report | undefined =
              reportStructure.reports?.find(
                item => item.reportId === report.reportId,
              );
            if (reportToCreate) {
              let visitKey = customer.pan + report.reportId;
              if (visits[visitKey]) {
                Toast.show(`${report.reportTitle} already exists for this customer`)
              } else {
                let newVisit: Visit = {
                  customer: customer,
                  report: reportToCreate,
                  status: 'created',
                  dateCreated: moment(new Date()).format('DD-MM-YYYY')
                };
                dispatch(
                  createVisit(newVisit),
                );
                navigation.navigate('VisitReport', {
                  visit: newVisit,
                });
              }
            } else {
              Toast.show('Report not found!');
            }
          } else {
            Toast.show('Customer not found!');
          }
        }}>
        <Surface
          key={report.reportId}
          elevation={2}
          style={{padding: 5, margin: 10, height: 100}}>
          <Text style={{overflow: 'visible', margin: 20, textAlign: 'center', fontWeight: "bold"}}>
            {report.reportTitle}
          </Text>
        </Surface>
      </TouchableOpacity>
    );
  };

  const getTwoCards = (keys: number[]) => {
    if (reportStructure?.reports) {
      let report1: Report | undefined = reportStructure?.reports[keys[0]];
      let report2: Report | undefined =
        keys.length == 2 ? reportStructure?.reports[keys[1]] : undefined;
      return (
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            marginHorizontal: 10,
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            {report1 && getReportSurface(report1)}
          </View>
          <View style={{flex: 1, alignSelf: 'center'}}>
            {report2 && getReportSurface(report2)}
          </View>
        </View>
      );
    } else return <></>;
  };

  const getCards = (reports: Report[]) => {
    let keys: number[] = [];
    let keysHandled = reports && Object.keys(reports).length;
    if (reports) {
      return reports.map((item, i) => {
        keys.push(i);
        if (
          keys.length === 2 ||
          keysHandled === 1 ||
          Object.keys(reports).length == 2
        ) {
          keysHandled -= 2;
          let twoCards = getTwoCards(keys);
          keys = [];
          return twoCards;
        }
      });
    } else {
      return <></>;
    }
  };

  return (
    <View style={{marginVertical: 20}}>
      <Surface elevation={2} style={{marginHorizontal: 25, marginBottom: 10, padding: 10}}>
        <Text style={{fontWeight: "bold", paddingVertical: 5, textDecorationLine: "underline"}}>Customer Details:</Text>
        <Text>Name: <Text style={{fontWeight: "bold"}}>{customer?.name}</Text></Text>
        <Text>PAN: <Text style={{fontWeight: "bold"}}>{decrypt(customer?.pan)}</Text></Text>
        <Text style={{marginVertical: 10}}>Please select a visit report type to proceed!</Text>
      </Surface>
      {reportStructure?.reports && getCards(reportStructure?.reports)}
    </View>
  );
};

export default VisitTypeSelection;
