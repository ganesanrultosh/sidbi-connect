import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Linking } from 'react-native'
import React from "react";
import { Button, Surface, useTheme } from "react-native-paper";

const Leads = () => {

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
      <Surface
        elevation={4}
        style={{ margin: 10, padding: 10, width: "95%", backgroundColor: "#FFFFED" }}>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <View style={{ flex: 5, alignSelf: 'flex-start' }}>
            <Text style={{ fontWeight: "bold", color: "black" }}>SOWBHAGYA GAR</Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>18th July, 2023</Text>
            <Text style={{ fontWeight: "bold", color: "black", marginTop: 10 }}>Loan Amount: 3 Lac</Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>Type: Entity</Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 10
            }}>
              <Text style={{ fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top" }}>9962510481</Text>
              <FontAwesome6 name={'phone'} solid style={{ paddingLeft: 10, textAlignVertical: "bottom" }} onPress={() => { Linking.openURL(`tel:9962510481`) }} />
            </View>
          </View>
          <View style={{ flex: 5, alignSelf: 'flex-start' }}>
            <Text style={{ fontWeight: "bold", color: "black" }}><Text style={{ fontWeight: "normal" }}>ID:</Text> 5673456</Text>
            <Text style={{ fontWeight: "bold", color: "orange" }}>In Rating Process</Text>
          </View>
        </View>

      </Surface>
      <Surface
        elevation={4}
        style={{ margin: 10, padding: 10, width: "95%", backgroundColor: "#FFCCCB" }}>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <View style={{ flex: 5, alignSelf: 'flex-start' }}>
            <Text style={{ fontWeight: "bold", color: "black" }}>SOWBHAGYA GAR</Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>18th July, 2023</Text>
            <Text style={{ fontWeight: "bold", color: "black", marginTop: 10 }}>Loan Amount: 3 Lac</Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>Type: Entity</Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 10
            }}>
              <Text style={{ fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top" }}>9962510481</Text>
              <FontAwesome6 name={'phone'} solid style={{ paddingLeft: 10, textAlignVertical: "bottom" }} onPress={() => { Linking.openURL(`tel:9962510481`) }} />
            </View>
          </View>
          <View style={{ flex: 5, alignSelf: 'flex-start' }}>
            <Text style={{ fontWeight: "bold", color: "black" }}><Text style={{ fontWeight: "normal" }}>ID:</Text> 5673456</Text>
            <Text style={{ fontWeight: "bold", color: "red" }}>Pending Documents</Text>
          </View>
        </View>

      </Surface>
      <Surface
        elevation={4}
        style={{ margin: 10, padding: 10, width: "95%", backgroundColor: "#90EE90" }}>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <View style={{ flex: 5, alignSelf: 'flex-start' }}>
            <Text style={{ fontWeight: "bold", color: "black" }}>SOWBHAGYA GAR</Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>18th July, 2023</Text>
            <Text style={{ fontWeight: "bold", color: "black", marginTop: 10 }}>Loan Amount: 3 Lac</Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>Type: Entity</Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 10
            }}>
              <Text style={{ fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top" }}>9962510481</Text>
              <FontAwesome6 name={'phone'} solid style={{ paddingLeft: 10, textAlignVertical: "bottom" }} onPress={() => { Linking.openURL(`tel:9962510481`) }} />
            </View>
          </View>
          <View style={{ flex: 5, alignSelf: 'flex-start' }}>
            <Text style={{ fontWeight: "bold", color: "black" }}><Text style={{ fontWeight: "normal" }}>ID:</Text> 5673456</Text>
            <Text style={{ fontWeight: "bold", color: "green" }}>Ready for sanction</Text>
          </View>
        </View>

      </Surface>
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