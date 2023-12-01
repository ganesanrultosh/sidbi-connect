import {Pressable, ScrollView, Text, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Linking} from 'react-native';
import {Button, Surface, useTheme} from 'react-native-paper';
import React from 'react';

const OngoingSiteVisits = () => {
  const theme = useTheme();

  return (
    <View>
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        snapToInterval={200} //your element width
        snapToAlignment={'center'}>
        <View>
          <Surface elevation={4} style={{margin: 10, padding: 20, width: 200}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Site: SOWBHAGYA GAR
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              18th July, 2023
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginBottom: 3,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <FontAwesome6
                name={'location-pin'}
                solid
                style={{paddingRight: 10, textAlignVertical: 'bottom'}}
                onPress={() => {
                  Linking.openURL(
                    'https://maps.google.com/?q=32A, North Usman Road, Bharathy Nagar, T. Nagar, Chennai, Tamil Nadu 600007',
                  );
                }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlignVertical: 'center',
                }}>
                Address:
              </Text>
            </View>
            <Text>
              32A, North Usman Road, Bharathy Nagar, T. Nagar, Chennai, Tamil
              Nadu 600007
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlignVertical: 'top',
                  verticalAlign: 'top',
                }}>
                9962510481
              </Text>
              <FontAwesome6
                name={'phone'}
                solid
                style={{paddingLeft: 10, textAlignVertical: 'bottom'}}
                onPress={() => {
                  Linking.openURL(`tel:9962510481`);
                }}
              />
            </View>
            <Button style={{alignSelf: 'flex-end'}}>Continue</Button>
          </Surface>
        </View>
        <View>
          <Surface elevation={4} style={{margin: 10, padding: 20, width: 200}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Site: SOWBHAGYA GAR
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              18th July, 2023
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginBottom: 3,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <FontAwesome6
                name={'location-pin'}
                solid
                style={{paddingRight: 10, textAlignVertical: 'bottom'}}
                onPress={() => {
                  Linking.openURL(
                    'https://maps.google.com/?q=32A, North Usman Road, Bharathy Nagar, T. Nagar, Chennai, Tamil Nadu 600007',
                  );
                }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlignVertical: 'center',
                }}>
                Address:
              </Text>
            </View>
            <Text>
              32A, North Usman Road, Bharathy Nagar, T. Nagar, Chennai, Tamil
              Nadu 600007
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlignVertical: 'top',
                  verticalAlign: 'top',
                }}>
                9962510481
              </Text>
              <FontAwesome6
                name={'phone'}
                solid
                style={{paddingLeft: 10, textAlignVertical: 'bottom'}}
                onPress={() => {
                  Linking.openURL(`tel:9962510481`);
                }}
              />
            </View>
            <Button style={{alignSelf: 'flex-end'}}>Continue</Button>
          </Surface>
        </View>
      </ScrollView>
    </View>
  );
};

export default OngoingSiteVisits;
