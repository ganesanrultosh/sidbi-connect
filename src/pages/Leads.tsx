import { ScrollView, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Linking } from 'react-native'
import React from "react";
import { Surface } from "react-native-paper";
import { useListLeadsQuery } from "../slices/leadSlice";
import { withTheme } from 'react-native-paper';

const Leads = () => {

  const {
    data: leads,
    isFetching,
    isError,
    error
  } = useListLeadsQuery(1);

  let statusDomain = [{
    label: 'Pending',
    value: 'Pending',
  }, {
    label: 'Processing',
    value: 'Processing',
  }, {
    label: 'Ready',
    value: 'Ready',
  }, {
    label: 'All',
    value: 'All',
  }];

  return <View><ScrollView
    decelerationRate={0}
    snapToAlignment={"center"}>
    <View>

      {
        (!leads || leads.length == 0) &&
        <Surface
          elevation={4}
          style={{ margin: 10, padding: 10, width: "95%", backgroundColor: "#FFFFED" }}>
            <Text>No leads found.</Text></Surface>
      }
      {
        (isFetching) && <Surface
          elevation={4}
          style={{ margin: 10, padding: 10, width: "95%", backgroundColor: "#FFFFED" }}>
            <Text>Fetching leads...</Text></Surface>
      }
      {
        (error) && <Surface
          elevation={4}
          style={{ margin: 10, padding: 10, width: "95%", backgroundColor: "#FFFFED" }}>
            <Text style={{ color: "red" }}>Error fetching leads!</Text></Surface>
      }
      {leads?.map(lead => {
        console.log(lead)
        return <Surface
          elevation={4}
          style={{ margin: 10, padding: 10, width: "95%", backgroundColor: "#FFFFED" }}><View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <View style={{ flex: 5, alignSelf: 'flex-start' }}>
              <Text style={{ fontWeight: "bold", color: "black" }}>{lead.entityName}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>{lead.dateCreated}</Text>
              <Text style={{ fontWeight: "bold", color: "black", marginTop: 10 }}>Loan Amount: ₹ {lead.loanAmount} lakhs</Text>
              <Text style={{ fontWeight: "bold", color: "black" }}>Type: {lead.loanType}</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 10
              }}>
                <Text style={{ fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top" }}>{lead.mobileNo}</Text>
                <FontAwesome6 name={'phone'} solid style={{ paddingLeft: 10, textAlignVertical: "bottom" }} onPress={() => { Linking.openURL(`tel:${lead.mobileNo}`) }} />
              </View>
            </View>
            <View style={{ flex: 5, alignSelf: 'flex-start' }}>
              <Text style={{ fontWeight: "bold", color: "black" }}><Text style={{ fontWeight: "normal" }}>ID:</Text> {lead.id}</Text>
              <Text style={{ fontWeight: "bold", color: "orange" }}>{lead.proposalStatus}</Text>
            </View>
          </View>
        </Surface>
      })}
    </View>

  </ScrollView></View>
}

const styles = StyleSheet.create({
  cell: {
    overflow: 'visible',
    whiteSpace: 'normal',
  },
});

export default Leads;