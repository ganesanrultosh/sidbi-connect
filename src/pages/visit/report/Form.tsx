import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Page from '../../../models/visit/reportStructure/page';
import Section from './Section';
import {Button, Surface, useTheme} from 'react-native-paper';
import Visit from '../../../models/visit/visit';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import VisitService, { postVisitTrigger } from '../../../services/visitService';
import Toast from 'react-native-root-toast';

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
  const {visits} = useAppSelector(state => state.persistedVisists);

  const styles = StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#FCFAFE',
    },
    formContainer: {
      width: '100%',
      flex: 1,
      paddingTop: 30,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontWeight: '500',
      fontSize: 20,
    },
    scrollView: {
      height: '84%',
      marginTop: 10,
    },
    scrollContainerStyle: {
      padding: 12,
      borderRadius: 5,
      borderWidth: 0.2,
      backgroundColor: '#fff',
    },
    buttonsContainer: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 12,
      alignItems: 'center',
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
    <View style={[styles.screenWrapper, {paddingBottom: 20}]}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>{visit?.report.reportTitle}</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainerStyle}>
          {page.segments?.map((item, index) => {
            return (
              <Section
                key={`section-${index}`}
                section={item}
                visitFieldUpdateContext={{
                  ...visitFieldUpdateContext,
                  segment: index,
                }}></Section>
            );
          })}
        </ScrollView>
        <View key={`FORM-buttons`} style={styles.buttonsContainer}>
          <View
            key={`FORM-buttons-back`}
            style={{flex: 1, alignItems: 'flex-end'}}>
            {pageNumber !== undefined && pageNumber > 0 && (
              <Button
                mode="outlined"
                style={{alignSelf: 'flex-start', display: 'flex'}}
                onPress={(e: any) => navigation.goBack()}>
                Back
              </Button>
            )}
          </View>
          <View
            key={`FORM-buttons-camera`}
            style={{flex: 1, alignItems: 'center'}}>
            <FontAwesome6Icon
              name="image"
              size={35}
              onPress={() => {
                navigation.navigate('Gallery', {visit: visit});
              }}
              color={`${theme.colors.tertiary}`}
            />
          </View>
          <View
            key={`FORM-buttons-next`}
            style={{
              flex: 1,
            }}>
            <Button
              mode="contained"
              style={{alignSelf: 'flex-end', display: 'flex'}}
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

                  if (visit) {
                    let visitToPost =
                      visits[visit.customer.pan + visit.report.reportId];

                    if (visitToPost) {
                      if(!visitToPost.visit.report.images || visitToPost.visit.report.images.length === 0) {
                        Toast.show('Atleast one image should be present.')
                      } else {
                        dispatch(postVisitTrigger({visit: visitToPost.visit}))
                        navigation.navigate('Home' as never)
                      }
                    }
                  }
                }
              }}>
              {pageNumber !== undefined &&
              length !== undefined &&
              pageNumber < length - 1
                ? 'Next'
                : 'Submit & Sync'}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Form;
