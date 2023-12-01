import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Page from '../../../models/visit/reportStructure/page';
import Section from './Section';
import {Button, Surface, useTheme} from 'react-native-paper';
import Visit from '../../../models/visit/visit';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import { useAppDispatch } from '../../../app/hooks';
import { submitVisit } from '../../../slices/visitCacheSlice';

const Form: React.FC<{
  navigation: any;
  reportId: number | undefined | null;
  pageNumber: number | undefined;
  length: number | undefined;
  page: Page;
  visit: Visit | undefined;
}> = ({visit, navigation, reportId, pageNumber, page, length}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    viewStyle: {flex: 1},
    surfaceStyle: {width: '90%', margin: 20, padding: 10},
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontSize: 20,
      fontWeight: 'bold',
    },
    scrollView: {height: '88%', marginTop: 10},
    continueButton: {alignSelf: 'center', display: 'flex'},
    radioGroupEnclosure: {
      marginTop: 10,
      borderBlockColor: 'black',
      borderWidth: 1,
      padding: 10,
      borderRadius: 3,
    },
  });

  let visitFieldUpdateContext: VisitFieldUpdateContext = {
    pan: visit?.customer.pan || '',
    reportId: visit?.report.reportId || -1,
    page: pageNumber !== undefined ? pageNumber : -1,
    segment: -1,
    fieldIndex: -1,
    groupItemIndex: -1,
    groupFieldIndex: -1,
    value: undefined,
  };

  return (
    <View style={styles.viewStyle}>
      <Surface elevation={4} style={styles.surfaceStyle}>
        <Text style={styles.headerText}>{visit?.report.reportTitle}</Text>
        <ScrollView style={styles.scrollView}>
          {page.segments?.map((item, index) => {
            return (
              <Section
                section={item}
                visitFieldUpdateContext={{...visitFieldUpdateContext, segment: index}}></Section>
            );
          })}
        </ScrollView>
        <View
          key={`FORM-buttons`}
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            height: 40,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View key={`FORM-buttons-back`} style={{flex: 1}}>
            <Button
              mode="outlined"
              style={styles.continueButton}
              onPress={(e: any) => navigation.goBack()}>
              Back
            </Button>
          </View>
          <View
            key={`FORM-buttons-next`}
            style={{
              flex: 1,
            }}>
            <Button
              mode="contained"
              style={styles.continueButton}
              onPress={(e: any) => {
                if (
                  pageNumber !== undefined &&
                  length !== undefined &&
                  pageNumber < length - 1
                ) {
                  console.log(`${reportId}-${pageNumber + 1}`);
                  navigation.navigate(`${reportId}-${pageNumber + 1}`);
                } else {
                  //Submit the visit
                  dispatch(submitVisit(visitFieldUpdateContext))
                }
              }}>
              {pageNumber !== undefined &&
              length !== undefined &&
              pageNumber < length - 1
                ? 'Next'
                : 'Save'}
            </Button>
          </View>
        </View>
      </Surface>
    </View>
  );
};

export default Form;
