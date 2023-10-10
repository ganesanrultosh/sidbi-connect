import { Pressable, ScrollView, Text, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Linking } from 'react-native'
import React, { useEffect } from "react";
import { Button, Surface, useTheme } from "react-native-paper";
import { RootState } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Lead } from "../models/Lead";
import { useNavigation } from "@react-navigation/native";
import { deleteLead } from "../slices/leadCacheSlice";

const OngoingLeads = () => {

  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { leads } = useAppSelector(state => state.persistedLeads);

  useEffect(() => {
    console.log("ongoing leads", leads);
  }, [leads]);

  function getCards(): React.ReactNode {
    let keys: string[] = []
    let keysHandled = Object.keys(leads).length;

    if (Object.keys(leads).length === 0) {
      return <View style={{ alignContent: "center", alignItems: "center", alignSelf: "center" }}>
        <Text style={{
          alignSelf: "center",
          textAlign: "center"
        }}>
          No ongoing leads found. Please create a new lead by clicking "Lead Generation" icon above.
        </Text>
      </View>
    } else {
      return Object.keys(leads).map((key) => {
        keys.push(key)
        if (keys.length === 2 || keysHandled === 1) {
          keysHandled -= 2;
          return <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={200} //your element width
            snapToAlignment={"center"}>
            {getTwoCards(keys)}
          </ScrollView>
          keys = [];
        }
      })
    }
  }

  function getTwoCards(keys: string[]) {
    let lead1: Lead | undefined = leads[keys[0]].lead
    let lead2: Lead | undefined = keys.length == 2 ? leads[keys[1]].lead : undefined
    return <View>
      {lead1 && getLeadSurface(lead1)}
      {lead2 && getLeadSurface(lead2)}
    </View>
  }

  function getLeadSurface(lead: Lead) {
    return <Surface
      elevation={4}
      style={{ margin: 10, padding: 10, width: 200 }}>
      <Text style={{ fontWeight: "bold", color: "black" }}>{lead?.name}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 12 }}>{lead?.dateCreated}</Text>
      <Text style={{ fontWeight: "bold", color: "black", marginTop: 10 }}>Loan Amount: {lead?.loanAmount} Lac</Text>
      <Text style={{ fontWeight: "bold", color: "black" }}>Type: {lead?.customerType?.toLocaleUpperCase()}</Text>
      {lead?.mobileNo && <View style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10
      }}>
        <Text style={{ fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top" }}>{lead?.mobileNo}</Text>
        <FontAwesome6 name={'phone'} solid style={{ paddingLeft: 10, textAlignVertical: "bottom" }} onPress={() => { Linking.openURL(`tel:9962510481`) }} />
      </View>}
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <View style={{ flex: 1, alignSelf: 'center' }}>
          <Button onPress={
            () => {
              dispatch(deleteLead(lead.pan))
            }
          }>Delete</Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button onPress={
            () => {
              console.log("OL", lead)
              navigation.navigate(
                'LeadBasicInfo',
                { lead: lead as Lead })
            }
          }>Continue</Button>
        </View>
      </View>


    </Surface>
  }

  return <View>
    {
      getCards()
    }
  </View>
}

export default OngoingLeads;
