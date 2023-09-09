import { Pressable, ScrollView, Text, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Linking} from 'react-native'
import React from "react";
import { Button, Surface, useTheme } from "react-native-paper";

const OngoingLeads = () => {

  const theme = useTheme();

  return <View><ScrollView
    horizontal={true}
    decelerationRate={0}
    snapToInterval={200} //your element width
    snapToAlignment={"center"}>
    <View><Surface
      elevation={4}
      style={{ margin: 10, padding: 10, width: 200 }}>
      <Text style={{fontWeight: "bold", color: "black"}}>Lead: SOWBHAGYA GAR</Text>
      <Text style={{fontWeight: "bold", fontSize: 12}}>18th July, 2023</Text>
      <Text style={{fontWeight: "bold", color: "black", marginTop: 10}}>Loan Amount: 3 Lac</Text>
      <Text style={{fontWeight: "bold", color: "black"}}>Type: Entity</Text>
      <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10
        }}>
        <Text style={{fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top"}}>9962510481</Text>
        <FontAwesome6 name={'phone'} solid style={{paddingLeft: 10, textAlignVertical:"bottom"}} onPress={() => {Linking.openURL(`tel:9962510481`)}}/>
      </View>
      <Button style={{alignSelf: "flex-end"}}>Continue</Button>
    </Surface></View>
    <View><Surface
      elevation={4}
      style={{ margin: 10, padding: 10, width: 200 }}>
      <Text style={{fontWeight: "bold", color: "black"}}>Lead: SOWBHAGYA GAR</Text>
      <Text style={{fontWeight: "bold", fontSize: 12}}>18th July, 2023</Text>
      <Text style={{fontWeight: "bold", color: "black", marginTop: 10}}>Loan Amount: 3 Lac</Text>
      <Text style={{fontWeight: "bold", color: "black"}}>Type: Entity</Text>
      <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10
        }}>
        <Text style={{fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top"}}>9962510481</Text>
        <FontAwesome6 name={'phone'} solid style={{paddingLeft: 10, textAlignVertical:"bottom"}} onPress={() => {Linking.openURL(`tel:9962510481`)}}/>
      </View>
      <Button style={{alignSelf: "flex-end"}}>Continue</Button>
    </Surface></View>
  </ScrollView></View>
}

export default OngoingLeads;