import React from "react"
import { Text, View } from "react-native"

import _reports from "../../../reports.json"
import ReportStructure from "../../models/visit/reportStructure/reportStructure"
import { Surface } from "react-native-paper"

const VisitTypeSelection = () => {
  const reportStructure = _reports as ReportStructure

  return <View>
  {reportStructure?.reports?.map((report) => {
    return <Surface elevation={4}><Text>{report.reportTitle}</Text></Surface>
  })}
  </View>
  
}

export default VisitTypeSelection;