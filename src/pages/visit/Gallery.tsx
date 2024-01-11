import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  HasCameraPermission,
  HasLocationPermission,
} from '../../utils/hasPermissions';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera} from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {GalleryProps, GalleryRouteProps} from '../navigation/NavigationProps';
import {useRoute, useTheme} from '@react-navigation/native';
import {addImage, deleteImage} from '../../slices/visitCacheSlice';
import Report from '../../models/visit/reportStructure/report';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Gallery = (props: GalleryProps) => {
  const route = useRoute<GalleryRouteProps>();
  const {visit} = route.params;
  const {visits} = useAppSelector(state => state.persistedVisists);
  const [currentForm, setCurrentForm] = useState<Report>();

  useEffect(() => {
    if (visits && visit?.customer.pan && visit?.report.reportId) {
      let visitInState = visits[visit?.customer.pan + visit?.report.reportId];
      if (visitInState) {
        setCurrentForm(visitInState.visit?.report);
      }
    }
  }, [visits]);
  const theme = useTheme();

  const styles = StyleSheet.create({
    img: {
      height: '100%',
      width: '100%',
    },
    delete: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'rgba(255,255,255,0.5)',
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 10,
      zIndex: 10,
    },
  });

  const dispatch = useAppDispatch();

  const getCameraImage = async () => {
    try {
      let cameraPermission = await HasCameraPermission();
      let locPermission = await HasLocationPermission();

      if (cameraPermission && locPermission) {
        Geolocation.getCurrentPosition(
          position => {
            launchCamera(
              {mediaType: 'photo', quality: 0.8, includeExtra: true},
              res => {
                if (!res || res.didCancel) {
                } else {
                  if (res?.assets && res?.assets?.length > 0) {
                    let visitLocal = visit;
                    if (visitLocal) {
                      dispatch(
                        addImage({
                          ...visitLocal,
                          report: {
                            ...visitLocal.report,
                            images: [
                              {
                                index: 0,
                                image: res.assets[0],
                                coords: position.coords,
                              },
                            ],
                          },
                        }),
                      );
                    }
                  }
                }
              },
            );
          },
          _error => {
            Toast.show('Unable to access location');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        Toast.show(
          cameraPermission
            ? 'Need Location Access'
            : 'Need Permission to Access Camera',
        );
      }
    } catch (error: any) {
      Toast.show(error?.message || 'something went wrong');
    }
  };

  let keysHandled = currentForm?.images?.length;
  let keys : any[] = [];

  const getTwoCards = (keys: any[]) => {
    let image1 : any = keys[0];
    let image2: any = keys[1];
    return <View style={{flex: 1, flexDirection: 'row', height: 200}}>
      {image1 && <View
        style={{
          width: '45%',
          margin: 10,
          padding: 10,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            let visitLocal = visit;
            if(visitLocal) {
              dispatch(
                deleteImage({
                  ...visitLocal,
                  report: {
                    ...visitLocal.report,
                    images: [
                      image1
                    ],
                  },
                }),
              );
            }
            
          }}>
          {/* <Ionicons
            maxFontSizeMultiplier={1}
            name="trash"
            size={20}
            color="#ff0000"
          /> */}
          <FontAwesome6
            name={'trash'}
            solid
            style={{paddingLeft: 10, textAlignVertical: 'bottom'}}
          />
        </TouchableOpacity>
        <Image
          source={{uri: image1.image.uri}}
          style={styles.img}
          resizeMethod="scale"
          resizeMode="cover"
        />
      </View>}
      {image2 && <View
        style={{
          width: '45%',
          margin: 10,
          padding: 10,
          backgroundColor: 'white',
        }}>
          <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            let visitLocal = visit;
            if(visitLocal) {
              dispatch(
                deleteImage({
                  ...visitLocal,
                  report: {
                    ...visitLocal.report,
                    images: [
                      image2
                    ],
                  },
                }),
              );
            }
          }}>
          <Ionicons
            maxFontSizeMultiplier={1}
            name="trash"
            size={20}
            color="#ff0000"
          />
        </TouchableOpacity>
        <Image
          source={{uri: image2.image.uri}}
          style={styles.img}
          resizeMethod="scale"
          resizeMode="cover"
        />
      </View>}
    </View>
  }

  return (
    <View style={{flex: 1}}>
      {currentForm?.images && currentForm?.images.length > 0 && <ScrollView style={{height: '90%'}}>
        {currentForm?.images?.map(item => {
          keys.push(item);
          if (
            keysHandled !== undefined && (
            keys.length === 2 ||
            keysHandled === 1)
          ) {
            keysHandled -= 2;
            let twoCards = getTwoCards(keys);
            keys = [];
            return twoCards;
          }
        })}
      </ScrollView>}
      {(!currentForm?.images || currentForm?.images.length === 0) && 
        <Text style={{flex: 1, margin: 20, fontSize: 20, fontWeight: "bold"}}>No images captured yet for this report.</Text>}
      <View style={{alignItems: 'center'}}>
        <Ionicons
          onPress={getCameraImage}
          name="camera-outline"
          color={'#5A3535'}
          size={60}
        />
      </View>
    </View>
  );
};

export default Gallery;
