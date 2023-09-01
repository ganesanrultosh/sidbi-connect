import { Box, Button, Pressable, Surface, useTheme } from "@react-native-material/core";
import { ScrollView, Text, TouchableOpacityComponent, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Linking} from 'react-native'
import { useNavigation } from "@react-navigation/native";

const OngoingLeadsHeader = () => {
  const navigation = useNavigation();
  
  return <View style={{
    backgroundColor: "lightgray", flexDirection: "row", justifyContent: "center", alignItems: "center"
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
        navigation.navigate('Lead' as never)
      }}/>
  </View>
}

export default OngoingLeadsHeader;