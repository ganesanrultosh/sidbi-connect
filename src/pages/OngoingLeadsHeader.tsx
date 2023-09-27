import { Text, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from "@react-navigation/native";
import React from "react";

const OngoingLeadsHeader = () => {
  return <View style={{
    backgroundColor: "lightgray", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
    margin: 10
  }}>
    <Text 
      style={{
          alignSelf: "center",
          margin: 10,
          fontSize: 20,
          fontWeight: "bold"
        }}>
      Ongoing Leads 
      </Text>
  </View>
}

export default OngoingLeadsHeader;