import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import uuid from 'react-native-uuid';
// import {useAppDispatch, useAppSelector} from '../../../hooks';
// import { getDomainData } from '../../../slices/visit';

// const items = [{
//   id: '92iijs7yta',
//   name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi'
// }, {
//   id: 'a0s0a8ssbsd',
//   name: 'Ogun'
// }, {
//   id: '16hbajsabsd',
//   name: 'Calabar'
// }, {
//   id: 'nahs75a5sg',
//   name: 'Lagos'
// }, {
//   id: '667atsas',
//   name: 'Maiduguri'
// }, {
//   id: 'hsyasajs',
//   name: 'Anambra'
// }, {
//   id: 'djsjudksjd',
//   name: 'Benue'
// }, {
//   id: 'sdhyaysdj',
//   name: 'Kaduna'
// }, {
//   id: 'suudydjsjd',
//   name: 'Abuja'
//   }
// ];



const MultiSelectComp = ({domainValue, onChange}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  // const disptach = useAppDispatch();
  // const {domainData: items} = useAppSelector(state => state.visit);

  // console.log('Domain Value', domainValue);

  onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems);
    onChange && onChange(selectedItems);
  };

  useEffect(() => {
    if(!items || !items[domainValue] || items[domainValue].length === 0) {
      // disptach(getDomainData({
      //   domain: domainValue,
      //   key: 'AADCM9831H'
      // }))
    }
  }, [])

  return items && items[domainValue] ? (
    <View style={{backgroundColor: '#EBF9F9', padding: 5, marginVertical: 5}}>
      <MultiSelect
        items={items[domainValue]}
        uniqueKey={`label`}
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={selectedItems}
        textInputProps={{
          style: {backgroundColor: '#CBF9F9'},
        }}
        selectText="Select ..."
        searchInputPlaceholderText="Search ..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CBF9F9"
        tagTextColor="black"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="label"
        searchInputStyle={{color: '#CCC'}}
        submitButtonColor="#rgba(108,78,212,0.88)"
        submitButtonText="Submit"
        tagContainerStyle={{flexBasis: '100%', backgroundColor: '#CBF9F9'}}
      />
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

// const styles = StyleSheet.create({
//   input: {
//     fontFamily: 'Roboto-Regular',
//     fontSize: 14,
//     color: 'rgba(90,53,53,0.88)',
//     height: '90%',
//     padding: 0,
//     marginHorizontal: 5,
//     width: '90%',
//   },
//   textArea: {
//     padding: 5,
//     // backgroundColor: "red",
//     alignSelf: 'flex-start',
//     textAlign: 'left',
//     textAlignVertical: 'top',
//     height: "90%"
//   },
//   btnContainer: {
//     color: 'black',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     backgroundColor: '#EFEFEF',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'black',
//   },
//   text: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//   },
// });

export default MultiSelectComp;