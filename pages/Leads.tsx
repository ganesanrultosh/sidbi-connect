import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { DataTable } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

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

  return <View><Text
    style={{
      alignSelf: "center",
      margin: 10,
      fontSize: 20,
      fontWeight: "bold"
    }}>
    Leads
  </Text>
    <DataTable>
      <DataTable.Header style={{backgroundColor: "#454545"}}>
        <DataTable.Title style={{flex: .7}}><Text style={{color: "#ffff"}}>Id</Text></DataTable.Title>
        <DataTable.Title style={{flex: 1.3}}><Text style={{color: "#ffff"}}>Info</Text></DataTable.Title>
        <DataTable.Title>
        <Text style={{color: "#ffff"}}>Status</Text>
        </DataTable.Title>
      </DataTable.Header>
      <DataTable.Row style={{backgroundColor: "#FFFFE0", marginTop: 10, marginVertical: 5}}>
        <DataTable.Cell style={{flex: .7}}>436763</DataTable.Cell>
        <DataTable.Cell style={{flex: 1.3}}>
          <View>
            <Text style={{color: "black", fontWeight: "bold"}}>SOWBHAGYA GAR</Text>
            <Text>18-07-2023</Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell>Processing</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{backgroundColor: "#FFCCCB", marginVertical: 5}}>
        <DataTable.Cell style={{flex: .7}}>876563</DataTable.Cell>
        <DataTable.Cell style={{flex: 1.3}}>
          <View>
            <Text style={{color: "black", fontWeight: "bold"}}>DE Enterprises</Text>
            <Text>18-07-2023</Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell>
            Pending
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{backgroundColor: "#90EE90", marginVertical: 5}}>
        <DataTable.Cell style={{flex: .7}}>876563</DataTable.Cell>
        <DataTable.Cell style={{flex: 1.3}}>
          <View>
            <Text style={{color: "black", fontWeight: "bold"}}>ABC Private Ltd.</Text>
            <Text>18-07-2023</Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell>
            Ready
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable></View>
}

const styles = StyleSheet.create({
  cell: {
    overflow: 'visible',
    whiteSpace: 'normal',
  },
});

export default Leads;