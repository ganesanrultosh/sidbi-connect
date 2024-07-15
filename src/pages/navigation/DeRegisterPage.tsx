import {useNavigation} from '@react-navigation/native';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,  
} from 'react-native';
import { useTheme} from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { deRegister, me } from '../../services/authService';

const DeRegisterPage = () => {

    const navigation = useNavigation();
    const theme = useTheme();


    const [username, setUsername] = useState<string>('');

    const styles = StyleSheet.create({

        screenWrapper: {
            flex: 1,
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0, 0.4)',
        },
        modalView: {
            marginHorizontal: 20,
            backgroundColor: '#FBF9FC',
            borderRadius: 12,
            padding: 20,
            alignItems: 'center',
            rowGap: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalText: {
        textAlign: 'justify',
        },
        buttonTermsAccept: {
        paddingVertical: 10,
        width: 100,
        borderRadius: 5,
        backgroundColor : 'purple',
        },
        textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        },
        buttonClose: {
        backgroundColor: `${theme.colors.primary}`,
        },
    });


    useEffect(()=>{
        let mounted = true;

        if(mounted){

            // fetch current user details ->  username
            const getCurrentUser = async () => {
                await me()
                .then(res => res.json())
                .then(data => {
                    if(data && data.username){
                        setUsername(data.username);
                    }
                }) 
                .catch(error => {
                    console.log("Error fetching current User Details, ERR: ", error);
                })

            }

            getCurrentUser()
        }

        return ()=>{
            // console.log("comp unmounted");
            mounted = false;
        }
    },[]);

    const handleContinue = async () => {

        await deRegister({username: username})
        .then(response => response.json())
        .then(data => {
            if(data.message && data.message === "De-Registration Successful"){
                Toast.show(data.message);
                navigation.navigate("Login");
            }else{
                Toast.show("Unable to De-Register. Try again later");
                navigation.navigate("Home");
            }
        }).catch(error=>{
            console.log("Error de-registering user ", error);
            Toast.show(error);
            navigation.navigate("Home");
        })
    }

    return <>
        <View style={styles.screenWrapper}
            >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>
                De-Registering will render this account to be inactive. You won't be able to login again with this user credentials. 
                </Text>
                <Text style={styles.modalText}>
                Are you sure you want to continue?
                </Text>
                <View style={{flexDirection: 'row', justifyContent:'center', columnGap: 10, width: 200}}>
                <Pressable
                style={[styles.buttonTermsAccept, styles.buttonClose]}
                onPress={(e: any) => {
                    e.preventDefault();
                    handleContinue();
                }}>
                <Text style={styles.textStyle}>Continue</Text>
                </Pressable>
                <Pressable
                style={[styles.buttonTermsAccept, styles.buttonClose]}
                onPress={(e: any) => {
                    e.preventDefault();
                    navigation.goBack();
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                </View>
            </View>
            </View>
        </View>
    </>
}

export default DeRegisterPage;

