import { Text, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from "@react-navigation/native";
import React from "react";

const OngoingLeadsHeader = () => {
  const navigation = useNavigation();
  
  return <View style={{
    backgroundColor: "lightgray", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
    marginTop: 20
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
      <FontAwesome6 name={"circle-plus"} size={25} style={{padding: 15, alignSelf: "flex-end", color: "blue"}} onPress={() => {
        navigation.navigate('Lead: Basic Information' as never)
      }}/>
  </View>
}

export default OngoingLeadsHeader;