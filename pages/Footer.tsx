import { Box, Flex } from "@react-native-material/core";
import { Text, View } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const Footer = () => {
  return <View style={{ 
      backgroundColor: "lightblue", flexDirection: "row", justifyContent: "center", alignItems: "center"
    }}>
    <FontAwesome6 name={"house"} size={20} style={{padding: 15}}/>
    <FontAwesome6 name={"gear"} size={20} style={{padding: 15}}/>
  </View>
}

export default Footer;