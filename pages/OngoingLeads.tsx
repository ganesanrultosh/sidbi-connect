import { Box, Button, Pressable, Surface, useTheme } from "@react-native-material/core";
import { ScrollView, Text, TouchableOpacityComponent, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Linking} from 'react-native'

const OngoingLeads = () => {

  const theme = useTheme();

  return <View><ScrollView
    horizontal={true}
    decelerationRate={0}
    snapToInterval={200} //your element width
    snapToAlignment={"center"}>
    <View><Surface
      elevation={6}
      category="medium"
      style={{ margin: 10, padding: 20, width: 200 }}>
      <Text style={{fontWeight: "bold", color: "black"}}>Lead: SOWBHAGYA GAR</Text>
      <Text style={{fontWeight: "bold", fontSize: 12}}>18th July, 2023</Text>
      <Text style={{fontWeight: "bold", color: "black", marginTop: 10}}>Loan Amount: 3 Lac</Text>
      <Text style={{fontWeight: "bold", color: "black"}}>Type: Entity</Text>
      <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10
        }}>
        <Text style={{fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top"}}>9962510481</Text>
        <FontAwesome6 name={'phone'} solid style={{paddingLeft: 10, textAlignVertical:"bottom"}} onPress={() => {Linking.openURL(`tel:9962510481`)}}/>
      </View>
      <Pressable>
        <Box style={{width: "100%", alignItems: "flex-end"}}>
          <Box 
            style={{
                backgroundColor: `${theme.palette.primary.main}` , 
                width: 70, 
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10
              }}>
            <Text style={{color: "white", verticalAlign: "bottom", padding: 5, borderRadius: 3 }}>Continue</Text>
          </Box>
        </Box>
      </Pressable>
    </Surface></View>
    <View><Surface
      elevation={6}
      category="medium"
      style={{ margin: 10, padding: 20, width: 200 }}>
      <Text style={{fontWeight: "bold", color: "black"}}>Lead: SOWBHAGYA GAR</Text>
      <Text style={{fontWeight: "bold", fontSize: 12}}>18th July, 2023</Text>
      <Text style={{fontWeight: "bold", color: "black", marginTop: 10}}>Loan Amount: 3 Lac</Text>
      <Text style={{fontWeight: "bold", color: "black"}}>Type: Entity</Text>
      <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10
        }}>
        <Text style={{fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top"}}>9962510481</Text>
        <FontAwesome6 name={'phone'} solid style={{paddingLeft: 10, textAlignVertical:"bottom"}} onPress={() => {Linking.openURL(`tel:9962510481`)}}/>
      </View>
      <Pressable>
        <Box style={{width: "100%", alignItems: "flex-end"}}>
          <Box 
            style={{
                backgroundColor: `${theme.palette.primary.main}` , 
                width: 70, 
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10
              }}>
            <Text style={{color: "white", verticalAlign: "bottom", padding: 5, borderRadius: 3 }}>Continue</Text>
          </Box>
        </Box>
      </Pressable>
    </Surface></View>
    <View><Surface
      elevation={6}
      category="medium"
      style={{ margin: 10, padding: 20, width: 200 }}>
      <Text style={{fontWeight: "bold", color: "black"}}>Lead: SOWBHAGYA GAR</Text>
      <Text style={{fontWeight: "bold", fontSize: 12}}>18th July, 2023</Text>
      <Text style={{fontWeight: "bold", color: "black", marginTop: 10}}>Loan Amount: 3 Lac</Text>
      <Text style={{fontWeight: "bold", color: "black"}}>Type: Entity</Text>
      <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10
        }}>
        <Text style={{fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top"}}>9962510481</Text>
        <FontAwesome6 name={'phone'} solid style={{paddingLeft: 10, textAlignVertical:"bottom"}} onPress={() => {Linking.openURL(`tel:9962510481`)}}/>
      </View>
      <Pressable>
        <Box style={{width: "100%", alignItems: "flex-end"}}>
          <Box 
            style={{
                backgroundColor: `${theme.palette.primary.main}` , 
                width: 70, 
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10
              }}>
            <Text style={{color: "white", verticalAlign: "bottom", padding: 5, borderRadius: 3 }}>Continue</Text>
          </Box>
        </Box>
      </Pressable>
    </Surface></View>
    <View><Surface
      elevation={6}
      category="medium"
      style={{ margin: 10, padding: 20, width: 200 }}>
      <Text style={{fontWeight: "bold", color: "black"}}>Lead: SOWBHAGYA GAR</Text>
      <Text style={{fontWeight: "bold", fontSize: 12}}>18th July, 2023</Text>
      <Text style={{fontWeight: "bold", color: "black", marginTop: 10}}>Loan Amount: 3 Lac</Text>
      <Text style={{fontWeight: "bold", color: "black"}}>Type: Entity</Text>
      <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10
        }}>
        <Text style={{fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top"}}>9962510481</Text>
        <FontAwesome6 name={'phone'} solid style={{paddingLeft: 10, textAlignVertical:"bottom"}} onPress={() => {Linking.openURL(`tel:9962510481`)}}/>
      </View>
      <Pressable>
        <Box style={{width: "100%", alignItems: "flex-end"}}>
          <Box 
            style={{
                backgroundColor: `${theme.palette.primary.main}` , 
                width: 70, 
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10
              }}>
            <Text style={{color: "white", verticalAlign: "bottom", padding: 5, borderRadius: 3 }}>Continue</Text>
          </Box>
        </Box>
      </Pressable>
    </Surface></View>
    <View><Surface
      elevation={6}
      category="medium"
      style={{ margin: 10, padding: 20, width: 200 }}>
      <Text style={{fontWeight: "bold", color: "black"}}>Lead: SOWBHAGYA GAR</Text>
      <Text style={{fontWeight: "bold", fontSize: 12}}>18th July, 2023</Text>
      <Text style={{fontWeight: "bold", color: "black", marginTop: 10}}>Loan Amount: 3 Lac</Text>
      <Text style={{fontWeight: "bold", color: "black"}}>Type: Entity</Text>
      <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10
        }}>
        <Text style={{fontWeight: "bold", color: "black", textAlignVertical: "top", verticalAlign: "top"}}>9962510481</Text>
        <FontAwesome6 name={'phone'} solid style={{paddingLeft: 10, textAlignVertical:"bottom"}} onPress={() => {Linking.openURL(`tel:9962510481`)}}/>
      </View>
      <Pressable>
        <Box style={{width: "100%", alignItems: "flex-end"}}>
          <Box 
            style={{
                backgroundColor: `${theme.palette.primary.main}` , 
                width: 70, 
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10
              }}>
            <Text style={{color: "white", verticalAlign: "bottom", padding: 5, borderRadius: 3 }}>Continue</Text>
          </Box>
        </Box>
      </Pressable>
    </Surface></View>
  </ScrollView></View>
}

export default OngoingLeads;