import React from "react"
import { Text } from "react-native"
import { VisitReportProps, VisitReportRouteProps } from "../navigation/NavigationProps";
import { useRoute } from "@react-navigation/native";
import _reports from '../../../reports.json';
import ReportStructure from "../../models/visit/reportStructure/reportStructure";
import {createStackNavigator} from '@react-navigation/stack';
import Form from "./Form";

const FormStack = createStackNavigator<any>();

const VisitReport = (props : VisitReportProps) => {
  const route = useRoute<VisitReportRouteProps>();
  const reportStructure = _reports as ReportStructure;
  const { visit } = route.params;
  const currentForm = reportStructure.reports?.find(item => item.reportId === visit?.report.reportId);
  return <>
  <FormStack.Navigator
    initialRouteName={`FORM-${visit?.report.reportId}`}
    screenOptions={{
      headerShown: false,
      animationEnabled: false,
    }}>
    {currentForm?.pages?.map((item, i: any) => {
      console.log("page", `${visit?.report.reportId}-${i}`)
      return (
        <FormStack.Screen
          key={`${visit?.report.reportId}-${i}`}
          name={`${visit?.report.reportId}-${i}`}>
          {props => <Form 
            {...props} 
            page={i} 
            reportId={visit?.report.reportId}
            length={currentForm.pages?.length}
            />}
        </FormStack.Screen>
      );
    })}
  </FormStack.Navigator>
</>
}

export default VisitReport;