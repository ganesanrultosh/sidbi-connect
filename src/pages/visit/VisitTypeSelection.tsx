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

const VisitTypeSelection = (props: VisitTypeSelectionProps) => {
  const reportStructure = _reports as ReportStructure;
  const navigation = useNavigation();
  const route = useRoute<VisitTypeSelectionRouteProps>();
  const {customer} = route.params;
  return (
    <View>
      {reportStructure?.reports?.map(report => {
        return (
          <Surface key={report.reportId} elevation={4}>
            <Text
              onPress={() => {
                console.log("reportid", report.reportId)
                if (customer) {
                  let reportToCreate: Report | undefined =
                    reportStructure.reports?.find(
                      item => item.reportId === report.reportId,
                    );
                  if(reportToCreate) {
                    navigation.navigate('VisitReport', {
                      visit: {
                        customer: customer,
                        report: reportToCreate,
                      },
                    });
                  } else {
                    Toast.show("Report not found!")  
                  }
                } else {
                  Toast.show("Customer not found!")
                }
              }}>
              {report.reportTitle}
            </Text>
          </Surface>
        );
      })}
    </View>
  );
};

export default VisitTypeSelection;
