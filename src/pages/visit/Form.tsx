import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Form: React.FC<{
  navigation: any;
  reportId: number | undefined | null;
  page: number | undefined;
  length: number | undefined;
}> = ({navigation, reportId, page, length}) => {
  return (
    <>
      <Text>
        Form {reportId} {page} {length}
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (page !== undefined && length !== undefined && page < length - 1) {
            console.log(`${reportId}-${page + 1}`);
            navigation.navigate(`${reportId}-${page + 1}`);
          } else {
            //Submit the form
          }
        }}>
        <Text>
          {page !== undefined && length !== undefined && page < length - 1
            ? 'Next'
            : 'Save'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Form;
