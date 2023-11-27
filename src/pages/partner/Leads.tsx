import { ScrollView, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Linking } from 'react-native'
import React, { useEffect, useState } from "react";
import { Surface } from "react-native-paper";
import { useListLeadsQuery } from "../../slices/leadSlice";
import { me } from "../../services/authService";
import { skipToken } from "@reduxjs/toolkit/query";

const Leads = () => {

  const [partnerId, setPartnerId] = useState<number>();

  const {
    data: leads,
    isFetching,
    isError,
    error
  } = useListLeadsQuery(partnerId || skipToken);

  useEffect(() => {
    me()
    .then((response) => response.json())
    .then((partner : Partner) => {
      setPartnerId(partner.id)
    });
  }, [])

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

  const getBgColor = (status: string | undefined) => {
    if(status === "0") {
      return "#FFFDF7"
    } else if(status === "1") {
      return "#FEF6F0"
    } else if(status === "2") {
      return "#F8F6F0"
    } else if(status === "3") {
      return "#FFFDF7"
    } else if(status === "4") {
      return "#FEF6F0"
    } else if(status === "5") {
      return "#F8F6F0"
    }
  }
  
  const getColor = (status: string | undefined) => {
    if(status === "0") {
      return "#ffcd3d"
    } else if(status === "1") {
      return "#d88b5d"
    } else if(status === "2") {
      return "#6f8661"
    } else if(status === "3") {
      return "#ffcd3d"
    } else if(status === "4") {
      return "#d88b5d"
    } else if(status === "5") {
      return "#6f8661"
    }
  }

  const getStatus = (status: string | undefined) => {
    if(status === "0") {
      return "Lead Created"
    } else if(status === "1") {
      return "Application Filing Started"
    } else if(status === "2") {
      return "Application Filed"
    } else if(status === "3") {
      return "Appraisal In Progress"
    } else if(status === "4") {
      return "Sanctioned"
    } else if(status === "5") {
      return "Application Rejected"
    }
  }

  return <View><ScrollView
    decelerationRate={0}
    snapToAlignment={"center"}>
    <View>

      {
        (!error && !isFetching && (!leads || leads?.length == 0)) && <Surface
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
          <Text style={{ color: "red" }}>Error fetching leads! {JSON.stringify(error)}</Text></Surface>
      }
      {leads?.map(lead => {
        console.log(lead)
        return <Surface
          elevation={4}
          key={`surface-${lead.id}`}
          style={{ margin: 10, padding: 15, width: "95%", backgroundColor: `${getBgColor(lead.leadStatus)}` }}><View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <View style={{ flex: 5, alignSelf: 'flex-start' }}>
              <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>{lead.entityName}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>{lead.dateCreated}</Text>
              <Text style={{ fontWeight: "bold", color: "black", fontSize: 15, marginTop: 10 }}>Loan Amount: ₹ {lead.loanAmount} lakhs</Text>
              <Text style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>Type: {lead.loanType}</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 10
              }}>
                <Text style={{ color: "black", textAlignVertical: "top", verticalAlign: "top", fontSize: 15 }}>{lead.mobileNo}</Text>
                <FontAwesome6 name={'phone'} solid style={{ paddingLeft: 10, textAlignVertical: "bottom" }} onPress={() => { Linking.openURL(`tel:${lead.mobileNo}`) }} />
              </View>
            </View>
            <View style={{ flex: 5, alignSelf: 'flex-start' }}>
              <Text style={{ fontWeight: "bold", color: "black" }}><Text style={{ fontWeight: "normal" }}>ID:</Text> {lead.id}</Text>
              <Text style={{ fontWeight: "bold", color: `${getColor(lead.leadStatus)}` }}>{getStatus(lead.leadStatus)}</Text>
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