import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import _reports from '../../../reports.json';
import ReportStructure from '../../models/visit/reportStructure/reportStructure';
import {Surface, Card, Paragraph} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  VisitTypeSelectionProps,
  VisitTypeSelectionRouteProps,
} from '../navigation/NavigationProps';
import Report from '../../models/visit/reportStructure/report';
import Toast from 'react-native-root-toast';
import {useDispatch} from 'react-redux';
import {createVisit, visitLocalStoreSlice} from '../../slices/visitCacheSlice';
import {useAppSelector} from '../../app/hooks';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';
import Visit from '../../models/visit/visit';
import decrypt from '../../utils/decrypt';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const VisitTypeSelection = (props: VisitTypeSelectionProps) => {
  const reportStructure = _reports as ReportStructure;
  const navigation = useNavigation();
  const route = useRoute<VisitTypeSelectionRouteProps>();
  const {customer} = route.params;
  const {visits} = useAppSelector(state => state.persistedVisists);
  const dispatch = useDispatch();

  const VisitTypeSelectionCard = (report: Report) => {
    return (
      <TouchableOpacity
        style={{width: screenWidth * 0.4, height: 120}}
        onPress={() => {
          if (customer) {
            let reportToCreate: Report | undefined =
              reportStructure.reports?.find(
                item => item.reportId === report.reportId,
              );
            if (reportToCreate) {
              let visitKey = customer.pan + report.reportId;
              if (visits[visitKey]) {
                Toast.show(
                  `${report.reportTitle} already exists for this customer`,
                );
              } else {
                // Check domainValues in Visit props
                let newVisit: Visit = {
                  customer: customer,
                  report: reportToCreate,
                  status: 'created',
                  dateCreated: moment(new Date()).format('DD-MM-YYYY'),
                };
                dispatch(createVisit(newVisit));
                navigation.navigate('VisitReport', {
                  visit: newVisit,
                });
              }
            } else {
              Toast.show('Report not found!');
            }
          } else {
            Toast.show('Customer not found!');
          }
        }}>
        <Card style={styles.Card}>
          <Card.Content style={styles.cardContent}>
            <Paragraph style={styles.paragraph}>
              {report?.reportTitle}
            </Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const getVisitTypeSelectionCards = (reports: Report[]) => {
    if (reports.length > 0) {
      return (
        <>
          {reports.map((item, i) => (
            <VisitTypeSelectionCard key={item.id} {...item} />
          ))}
        </>
      );
    } else {
      return <></>;
    }
  };

  const styles = StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#FCFAFE',
    },
    screenContainer: {
      flex: 1,
      width: '100%',
      paddingTop: 20,
    },
    customerDetails: {
      width: '100%',
      paddingHorizontal: 20,
      flexDirection: 'column',
      rowGap: 10,
    },
    cardsContainer: {
      flex: 1,
      width: '100%',
      paddingTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      rowGap: 15,
    },
    Card: {
      width: '100%',
      height: '100%',
      backgroundColor: '#e5e5e5',
      borderRadius: 5,
    },
    cardContent: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paragraph: {
      fontSize: 16,
      color: '#1f2937',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.screenContainer}>
        <View style={styles.customerDetails}>
          <Text
            numberOfLines={1}
            style={{fontSize: 20, fontWeight: '500', color: '#1f2937'}}>
            {customer?.name}
          </Text>
          <Text style={{fontSize: 18, fontWeight: '500', color: '#1f2937'}}>
            PAN: {decrypt(customer?.pan)}
          </Text>
          <Text style={{fontSize: 16, color: '#4b5563', fontStyle: 'italic'}}>
            Please select a visit report type to proceed
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          {reportStructure?.reports &&
            getVisitTypeSelectionCards(reportStructure?.reports)}
        </View>
      </View>
    </View>
  );
};

export default VisitTypeSelection;
