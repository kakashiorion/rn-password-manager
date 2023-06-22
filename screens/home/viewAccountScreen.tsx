import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  HomeStackParamList,
  IconRevertDuration,
  myColors,
  myFontFamilies,
  myFontSizes,
} from "../../styles/global";
import {
  deleteAccountFromDB,
  findIcon,
  getLocalData,
  updateAccountPasswordToDB,
} from "../../utils/methods";
import * as Clipboard from "expo-clipboard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewAccountScreen({
  navigation,
}:{
  navigation:NativeStackScreenProps<HomeStackParamList, 'ViewAccount'>['navigation'],
}) {

  const netInfo = useNetInfo()
  const route = useRoute<NativeStackScreenProps<HomeStackParamList, 'ViewAccount'>['route']>()
  const accountEmail = route.params.email
  const accountTime = route.params.account.accountTime
  const accountName = route.params.account.accountName
  const accountIcon = findIcon(accountName) as any

  const [accountUserName, setAccountUserName] = useState(
    route.params.account.accountUserName
  );
  const [accountPassword, setAccountPassword] = useState(
    route.params.account.accountPassword
  );
  const [accountNotes, setAccountNotes] = useState(
    route.params.account.accountNotes
  );
  const [passwordShown, setPasswordShown] = useState(false);
  const [copyUNIconName, setCopyUNIconName] = useState("copy" as any);
  const [copyPWDIconName, setCopyPWDIconName] = useState("copy" as any);
  const [copyUNIconColor, setCopyUNIconColor] = useState(myColors.backgroundColor);
  const [copyPWDIconColor, setCopyPWDIconColor] = useState(myColors.backgroundColor);

  return (
    //Background Container
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Main Container */}
      <View style={styles.homeContainer}>
        {/*Header*/}
        <View style={styles.viewHeader}>
          <Ionicons
            name="arrow-back"
            size={32}
            style={styles.backIcon}
            onPress={() => navigation.pop()}
          />
          <Text style={styles.viewTitle}>{accountName}</Text>
        </View>
        {/* Account Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name={accountIcon ?? "at-circle-outline"}
            size={64}
            style={{ color: myColors.textColor }}
          />
        </View>
        {/*Edit user name */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="User/Account ID"
            placeholderTextColor={myColors.primaryColor}
            value={accountUserName}
            onChangeText={(t) => {
              setAccountUserName(t);
            }}
            style={[styles.accountNameInput]}
          />
          <TouchableOpacity
            style={[
              styles.copyButtonContainer,
            ]}
            onPress={async () => {
              await Clipboard.setStringAsync(accountUserName);
              //Change to checkmark icon when clicked
              setCopyUNIconName("checkmark-outline");
              setCopyUNIconColor(myColors.primaryColor);
              ToastAndroid.show("Copied!", IconRevertDuration);
              //Change back to copy icon after 2 seconds
              setTimeout(() => {
                setCopyUNIconName("copy");
                setCopyUNIconColor(myColors.backgroundColor);
              }, IconRevertDuration);
            }}
          >
            <Ionicons
              name={copyUNIconName ?? "copy"}
              size={20}
              style={{ color: copyUNIconColor }}
            />
          </TouchableOpacity>
        </View>
        {/*Edit password */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password/PIN/Number"
            placeholderTextColor={myColors.primaryColor}
            value={accountPassword}
            onChangeText={(t) => {
              setAccountPassword(t);
            }}
            style={[styles.accountNameInput]}
            secureTextEntry={!passwordShown}
          />
          <TouchableOpacity
            style={[
              styles.viewButtonContainer,{
                backgroundColor: !passwordShown? myColors.textColor:myColors.backgroundColor,
              }
            ]}
            onPress={() => {
              setPasswordShown(!passwordShown);
            }}
          >
            <Ionicons
              name={!passwordShown?"eye":"eye-off"}
              size={20}
              style={{ color: !passwordShown? myColors.backgroundColor:myColors.textColor}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.copyButtonContainer,
            ]}
            onPress={async () => {
              await Clipboard.setStringAsync(accountPassword);
              //Change to checkmark icon when clicked
              setCopyPWDIconName("checkmark-outline");
              setCopyPWDIconColor(myColors.primaryColor);
              ToastAndroid.show("Copied!", IconRevertDuration);
              //Change back to copy icon after 2 seconds
              setTimeout(() => {
                setCopyPWDIconName("copy");
                setCopyPWDIconColor(myColors.backgroundColor);
              }, IconRevertDuration);
            }}
          >
            <Ionicons
              name={copyPWDIconName ?? "copy"}
              size={20}
              style={{ color: copyPWDIconColor }}
            />
          </TouchableOpacity>
        </View>
        {/*Edit notes - optional */}
        <TextInput
          placeholder="Any notes (Optional)"
          placeholderTextColor={myColors.primaryColor}
          value={accountNotes}
          multiline={true}
          numberOfLines={3}
          onChangeText={(t) => {
            setAccountNotes(t);
          }}
          style={styles.multipleInput}
        />
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={async () => {
              if (netInfo.isConnected){
                if (accountUserName!="" && accountPassword!=""){
                  //Update in local storage
                  const data ={
                    accountName: accountName,
                    accountUserName: accountUserName,
                    accountPassword: accountPassword,
                    accountNotes: accountNotes,
                    accountTime: accountTime
                  }
                  AsyncStorage.setItem(accountTime,JSON.stringify(data))
                  //Update in DB
                  updateAccountPasswordToDB(
                    accountEmail,
                    accountTime,
                    accountName,
                    accountUserName,
                    accountPassword,
                    accountNotes
                  );
                  navigation.replace("Home");
                }
              } else {
                //No internet
                Alert.alert("You are not connected to the internet")
              }

            }}
          >
            <Text style={styles.saveButtonText}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (netInfo.isConnected){
                Alert.alert(
                  "Delete details?",
                  `Are you sure you want to delete saved details of your ${accountName} account?`,
                  [
                    {
                      text: "Yes, Delete",
                      onPress: async () => {
                        //Delete from local storage
                        AsyncStorage.removeItem(accountTime)
                        const accounts:string[] = JSON.parse(await getLocalData("accounts")??"[]")
                        AsyncStorage.setItem("accounts",JSON.stringify(accounts.filter(a=>a!=accountTime)))
                        //Delete in DB
                        deleteAccountFromDB(accountEmail, accountTime);
                        navigation.replace("Home");
                      },
                      style: "destructive",
                    },
                    { text: "No", onPress: () => {} ,style:'cancel' },
                  ],
                  { cancelable: true }
                );
              } else {
                //No internet
                Alert.alert("You are not connected to the internet")
              }
            }}
          >
            <Text style={styles.deleteButtonText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
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
  iconContainer: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: myColors.backgroundColor,
    marginVertical: 16,
  },
  copyButtonContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:myColors.textColor,
    shadowRadius: 2,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  viewButtonContainer: {
    height: 40,
    width: 40,
    marginRight:8,
    borderRadius: 20,
    borderWidth:2,
    borderColor:myColors.textColor,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 2,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountNameInput: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.regular,
    color: myColors.textColor,
    backgroundColor: myColors.tintBackgroundColor,
    width: "100%",
    marginVertical: 16,
    borderRadius: 8,
    flex:1,
    marginRight:8,
  },
  multipleInput: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.regular,
    color: myColors.textColor,
    backgroundColor: myColors.tintBackgroundColor,
    width: "100%",
    height: 96,
    marginVertical: 16,
    borderRadius: 8,
  },
  accountPasswordInput: {
    flex: 1,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginVertical:16,
  },
  saveButton: {
    borderRadius: 8,
    paddingHorizontal: 32,
    textAlign:"center",
    paddingVertical: 12,
    backgroundColor: myColors.tintPrimaryColor,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    color: myColors.backgroundColor,
  },
  deleteButtonText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    color: myColors.tintTextColor,
  },
});
