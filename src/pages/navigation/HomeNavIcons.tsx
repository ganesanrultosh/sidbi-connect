import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Surface } from "react-native-paper";
import { Lead } from "../../models/partner/Lead";

const HomeNavIcons = () => {

  const navigation = useNavigation();

  return <View>
  <ScrollView horizontal={true}><Surface elevation={0} style={{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    paddingVertical: 10
  }}>
    <Surface
      elevation={2}
      style={{ margin: 10 }}
    >
      <TouchableOpacity style={styles.buttonFacebookStyle} activeOpacity={0.5} onPress={() => {
        navigation.navigate(
          'LeadBasicInfo',
          {lead: {} as Lead})
      }}>
        <Image
          source={require('../../images/LeadGenerationIcon.png')}
          style={styles.buttonImageIconStyle}
        />
        <Text style={styles.buttonTextStyle}> Lead Generation </Text>
      </TouchableOpacity>
    </Surface>
    <Surface
      elevation={2}
      style={{ margin: 10 }}
    >
      <TouchableOpacity style={styles.buttonFacebookStyle} activeOpacity={0.5} onPress={() => {
        navigation.navigate(
          'SiteVisitCustomerSearch')
      }}>
        <Image
          source={require('../../images/sitevisit.png')}
          style={styles.buttonImageIconStyle}
        />
        <Text style={styles.buttonTextStyle}> Site Visits </Text>
      </TouchableOpacity>
    </Surface>
    <Surface
      elevation={2}
      style={{ margin: 10 }}
    >
      <TouchableOpacity style={styles.buttonFacebookStyle} activeOpacity={0.5} onPress={() => {
        navigation.navigate('Leads' as never)
      }}>
        <Image
          source={require('../../images/ViewLeadsIcon.png')}
          style={styles.buttonImageIconStyle}
        />
        <Text style={styles.buttonTextStyle}> View Leads </Text>
      </TouchableOpacity>
    </Surface>
  </Surface></ScrollView></View>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 30,
    padding: 30,
  },
  buttonGPlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 5,
    margin: 5,
  },
  buttonFacebookStyle: {
    alignItems: 'center',
    alignContent: 'center',
    // borderWidth: 0.5,
    // borderColor: '#fff',
    // borderRadius: 5,
    margin: 5,
    width: 150
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 55,
    width: 55,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    marginBottom: 4,
    marginLeft: 10,
    fontSize: 18
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});

export default HomeNavIcons;