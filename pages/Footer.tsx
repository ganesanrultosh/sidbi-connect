import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const Footer = () => {
  const navigation = useNavigation();
  
  return <View style={{ 
      backgroundColor: "lightblue", flexDirection: "row", justifyContent: "center", alignItems: "center"
    }}>
    <FontAwesome6 name={"house"} size={20} style={{padding: 15}} onPress={() => navigation.navigate('Home' as never)}/>
    <FontAwesome6 name={"gear"} size={20} style={{padding: 15}}/>
  </View>
}

export default Footer;