import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Alert,
  ToastAndroid,
} from "react-native";
import { HomeStackParamList, IconRevertDuration, myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import { UserContext, getLocalData, updateUserName } from "../../utils/methods";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";

export default function SettingsScreen({navigation}:{
  navigation:NativeStackScreenProps<HomeStackParamList, 'Settings'>['navigation']
}) {
  
  const deviceUser = useContext(UserContext);
  const uName = deviceUser.username;
  
  const netInfo = useNetInfo()

  const [fingerprintsettings, setFingerprintsettings] = useState(false);

  const toggleFingerprint=(t: boolean)=> {
    AsyncStorage.setItem("fingerprint", JSON.stringify(t));
  }

  const changeUserName = ()=>{
    if (netInfo.isConnected){
      Alert.prompt("Change username",'Enter your name',(s:string)=>{
        if (s!=""){
          //Change in DB
          updateUserName(deviceUser.email,s)
          //Change in local storage
          AsyncStorage.setItem(
            "user",
            JSON.stringify({
              email: deviceUser.email,
              username: s,
              pin: deviceUser.pin,
            })
          );
          ToastAndroid.show("Username changed successfully!",IconRevertDuration);
        }
      })
    } else {
      //No internet
      Alert.alert("You are not connected to the internet")
    }
  }

  const changePIN = ()=>{
    Alert.prompt("Change PIN",'Enter your new PIN',(s:string)=>{
      const newPIN = Number(s)
      if (s.length == 4 && newPIN<10000 && newPIN>=0){
      //Change in local storage
        AsyncStorage.setItem(
          "user",
          JSON.stringify({
            email: deviceUser.email,
            username: deviceUser.username,
            pin: s,
          })
        );
        ToastAndroid.show("PIN changed successfully!",IconRevertDuration);
      }
    })
  }

  const logOut =()=>{
    navigation.pop();
    navigation.replace("Login");
  }

  const getUserSettingsLocal = useCallback(async ()=>{
    getLocalData("fingerprint").then((data) => {
      if (data) {
        setFingerprintsettings(JSON.parse(data));
      }
    });
  },[])

  useEffect(() => {
    getUserSettingsLocal()
  }, [toggleFingerprint]);

  return (
    <View style={styles.mainContainer}>
      {/*Header*/}
      <View style={styles.viewHeader}>
          <Ionicons
            name="arrow-back"
            size={32}
            style={styles.backIcon}
            onPress={() => navigation.pop()}
          />
          <Text style={styles.viewTitle}>Your Settings</Text>
        </View>
      {/* User Name */}
      <View style={styles.userNameContainer}>
        <Text style={styles.usernameText}>{uName}</Text>
        <Ionicons
            name="create-outline"
            size={24}
            style={styles.editIcon}
            onPress={() => changeUserName()}
          />
      </View>
      {/* Email */}
      <Text style={styles.emailText}>{deviceUser.email}</Text>
      <Text style={styles.pinText} onPress={()=>changePIN()}>Change PIN</Text>
      {/* Settings Container */}
      <View style={styles.settingsMainContainer}>
        {/* Fingerprint settings */}
        <View style={styles.settingContainer}>
          <Ionicons
            name="finger-print-outline"
            size={40}
            style={styles.settingIcon}
          />
          <Text style={styles.settingText}>Enable fingerprint login</Text>
          <Switch
            trackColor={{
              false: myColors.tintBackgroundColor,
              true: myColors.primaryColor,
            }}
            thumbColor={myColors.tintTextColor}
            ios_backgroundColor={myColors.tintBackgroundColor}
            onValueChange={(t) => toggleFingerprint(t)}
            value={fingerprintsettings}
          />
        </View>
        {/* Store online settings */}
        {/* <View style={styles.settingContainer}>
          <Ionicons
            name="cloud-upload-outline"
            size={40}
            style={styles.settingIcon}
          />
          <Text style={styles.settingText}>Store Online</Text>
          <Switch
            trackColor={{
              false: myColors.tintBackgroundColor,
              true: myColors.primaryColor,
            }}
            thumbColor={myColors.tintTextColor}
            ios_backgroundColor={myColors.tintBackgroundColor}
            onValueChange={(t) => toggleOnline(t)}
            value={deviceSettings.storeOnline}
          />
        </View> */}
      </View>
      <Text style={styles.logoutText} onPress={()=>logOut()}>LOGOUT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: myColors.shadePrimaryColor,
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  viewHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  viewTitle: {
    flex: 1,
    fontSize: myFontSizes.xl,
    fontFamily: myFontFamilies.bold,
    color: myColors.textColor,
  },
  backIcon: {
    color: myColors.tintTextColor,
    marginRight: 16,
  },
  userNameContainer:{
    flexDirection:'row',
    marginTop:16,
    marginBottom:16,
    alignItems:'center',
    justifyContent:'center',
  },
  editIcon: {
    color: myColors.tintTextColor,
  },
  usernameText: {
    fontFamily: myFontFamilies.bold,
    color: myColors.textColor,
    fontSize: myFontSizes.large,
    marginRight:8,
  },
  emailText: {
    fontFamily: myFontFamilies.regular,
    color: myColors.tintTextColor,
    fontSize: myFontSizes.regular,
    marginBottom: 16,
  },
  pinText:{
    fontFamily: myFontFamilies.regular,
    color: myColors.tintTextColor,
    fontSize: myFontSizes.regular,
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  logoutText:{
    fontFamily: myFontFamilies.regular,
    color: myColors.primaryColor,
    fontSize: myFontSizes.regular,
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  settingsMainContainer: {
    paddingVertical: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    width: "100%",
  },
  settingsTitleText: {
    fontFamily: myFontFamilies.regular,
    color: myColors.tintTextColor,
    fontSize: myFontSizes.regular,
    marginVertical: 8,
  },
  settingContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: myColors.backgroundColor,
    borderRadius: 8,
  },
  settingText: {
    fontFamily: myFontFamilies.bold,
    color: myColors.textColor,
    fontSize: myFontSizes.regular,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
  },
  settingIcon: {
    color: myColors.tintPrimaryColor,
  },
});
