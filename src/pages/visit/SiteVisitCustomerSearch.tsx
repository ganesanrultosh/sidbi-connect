import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Modal} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const customers = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    customerName: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    customerName: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    customerName: 'Third Item',
  },
];

const SiteVisitCustomerSearch = () => {
  const navigation = useNavigation();
  const [showCreate, setShowCreate] = useState(false);
  const [pan, setPan] = useState("ALQPG9479C");
  const [name, setName] = useState("Ganesan")
  return (
    <View>
      <TextInput mode="outlined" placeholder="Search Name or PAN" />
      <Button mode="contained">Search</Button>
      <View>
        {customers.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate('VisitTypeSelection', {customer: {
                  pan: pan,
                  name: name
                }});
              }}>
              <Text maxFontSizeMultiplier={1} numberOfLines={2}>
                {item.customerName}
              </Text>
              <FontAwesome6 name="greater-than" />
            </TouchableOpacity>
          );
        })}
        <Text>Customer not found</Text>
        <TouchableOpacity
          onPress={() => {
            setShowCreate(true);
          }}>
          <Text>Create customer</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showCreate} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightgray',
            marginHorizontal: 10,
            marginVertical: 250,
          }}>
          <TextInput mode="outlined" placeholder="Customer Name" style={{width: "90%"}} />
          <TextInput mode="outlined" placeholder="PAN" style={{width: "90%"}}/>
          <Button onPress={() => {
            setShowCreate(false)
          }}>Save</Button>
          <Button onPress={() => {
            setShowCreate(false)
          }}>Close</Button>
        </View>
      </Modal>
    </View>
  );
};

export default SiteVisitCustomerSearch;
