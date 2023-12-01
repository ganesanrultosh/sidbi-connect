import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {
  VisitReportProps,
  VisitReportRouteProps,
} from '../navigation/NavigationProps';
import {useRoute} from '@react-navigation/native';
import _reports from '../../../reports.json';
import {createStackNavigator} from '@react-navigation/stack';
import Form from './report/Form';
import {useAppSelector} from '../../app/hooks';
import Report from '../../models/visit/reportStructure/report';

const FormStack = createStackNavigator<any>();

const VisitReport = (props: VisitReportProps) => {
  const route = useRoute<VisitReportRouteProps>();
  const {visit} = route.params;
  const {visits} = useAppSelector(state => state.persistedVisists);
  const [currentForm, setCurrentForm] = useState<Report>();

  useEffect(() => {
    if (visits && visit?.customer.pan && visit?.report.reportId) {
      let visitInState = visits[visit?.customer.pan + visit?.report.reportId];
      if (visitInState) {
        setCurrentForm(visitInState.visit?.report);
      }
    }
  }, [visits]);

  return currentForm ? (
    <>
      <FormStack.Navigator
        initialRouteName={`FORM-${visit?.report.reportId}`}
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {currentForm?.pages?.map((item, i: any) => {
          console.log('page', `${visit?.report.reportId}-${i}`);
          return (
            <FormStack.Screen
              key={`${visit?.report.reportId}-${i}`}
              name={`${visit?.report.reportId}-${i}`}>
              {props => (
                <Form
                  {...props}
                  pageNumber={i}
                  reportId={visit?.report.reportId}
                  length={currentForm.pages?.length}
                  page={item}
                  visit={visit}
                />
              )}
            </FormStack.Screen>
          );
        })}
      </FormStack.Navigator>
    </>
  ) : (
    <Text>Loading...</Text>
  );
};

export default VisitReport;
