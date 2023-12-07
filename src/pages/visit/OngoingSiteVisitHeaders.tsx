import { Text, View } from "react-native";
import React from "react";

const OngoingSiteVisitsHeader = () => {
  return <View style={{
    flexDirection: "row", 
    margin: 15,
    paddingHorizontal: 10
  }}>
    <Text 
      style={{
          alignSelf: "center",
          fontSize: 18,
          fontWeight: "bold",
          color: "#3f7ebb"
        }}>
      Ongoing Visits 
      </Text>
  </View>
}

export default OngoingSiteVisitsHeader;