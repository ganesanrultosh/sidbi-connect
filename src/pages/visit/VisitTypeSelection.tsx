import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView,StyleSheet, Text, View} from 'react-native';
// import _reports from '../../../reports.json'; not needed [vigneshj]
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
import useToken from '../../components/Authentication/useToken';
import Config from 'react-native-config';
const visitApiEndpoint = Config.REACT_APP_VISIT_API_ENDPOINT;
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const VisitTypeSelection = (props: VisitTypeSelectionProps) => {
  // const reportStructure = _reports as ReportStructure;
  const navigation = useNavigation();
  const route = useRoute<VisitTypeSelectionRouteProps>();
  const {customer} = route.params;
  const {visits, reportStructure} = useAppSelector(state => state.persistedVisists);
  const dispatch = useDispatch();

  const {getUserRole, getToken} = useToken();

<<<<<<< Updated upstream
  const [reportCards, setReportCards] = useState<Report[] | undefined>();

  const getReportStructure = async () => {
    const token = await getToken();
    try {
      await fetch(`${visitApiEndpoint}/api/reportstructure`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(_reportsAll => {
          // set report cards for different user roles
          const {reports} = _reportsAll;

          getUserRole().then(data => {
            if (data !== 'GST' && data !== 'NBFC') {
              const reportsArray = reports?.filter((item: any) =>
                [1, 2, 3, 4, 5, 6].includes(item.reportId),
              );
              setReportCards(reportsArray);
            } else if (data === 'NBFC') {
              const reportsArray = reports?.filter((item: any) =>
                [7].includes(item.reportId),
              );
              setReportCards(reportsArray);
            } else if (data === 'GST') {
              const reportsArray = reports?.filter((item: any) =>
                [8, 9, 10, 11, 12, 13, 14].includes(item.reportId),
              );
              setReportCards(reportsArray);
            }
          });
        });
    } catch (error: any) {
      console.log('error fetching reports structure ', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // fetch reportStructure on mount
      getReportStructure();
    }

    return () => {
      mounted = false;
    };
  }, []);

=======
>>>>>>> Stashed changes
  const VisitTypeSelectionCard = (report: Report) => {
    return (
      <TouchableOpacity
        style={{width: screenWidth * 0.4, height: 120}}
        onPress={() => {
          if (customer) {
            let reportToCreate: Report | undefined = reportStructure?.find(
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
            <VisitTypeSelectionCard
              key={item.reportId + '_' + item.id}
              {...item}
            /> // key > reportId_id
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
    scrollView: {
      flex: 1,
      marginVertical: 15,
    },
    scrollContainer: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      rowGap: 10,
    },
    cardsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      rowGap: 10,
      columnGap: 10,
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
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={[styles.scrollContainer]}>
          <View style={[styles.cardsContainer]}>
            {reportStructure && getVisitTypeSelectionCards(reportStructure)}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default VisitTypeSelection;
