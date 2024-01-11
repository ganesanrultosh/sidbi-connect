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
    viewStyle: {flex: 1},
    surfaceStyle: {width: '90%', margin: 20, padding: 10},
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontSize: 20,
      fontWeight: 'bold',
    },
    scrollView: {height: '80%', marginTop: 10},
    continueButton: {alignSelf: 'flex-start', display: 'flex'},
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
                key={`section-${index}`}
                section={item}
                visitFieldUpdateContext={{
                  ...visitFieldUpdateContext,
                  segment: index,
                }}></Section>
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
                      if(!visit.report.images || visit.report.images.length === 0) {
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
                : 'Save'}
            </Button>
          </View>
        </View>
      </Surface>
    </View>
  );
};

export default Form;
