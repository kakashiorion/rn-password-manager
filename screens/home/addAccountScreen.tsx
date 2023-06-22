import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { HomeStackParamList, myColors, myFontFamilies, myFontSizes, myLogos } from "../../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  UserContext,
  addAccountPasswordToDB,
  findIcon,
  getLocalData,
} from "../../utils/methods";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";

export default function AddAccountScreen({ navigation }: { navigation: NativeStackScreenProps<HomeStackParamList, 'AddAccount'>['navigation'] }) {
  const [accountIcon, setAccountIcon] = useState("at-circle-outline" as any);
  const [accountName, setAccountName] = useState("");
  const [accountUserName, setAccountUserName] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountNotes, setAccountNotes] = useState("");

  const deviceUser = useContext(UserContext);
  const netInfo = useNetInfo()

  return (
    //Background Container
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Main Container */}
      <View style={styles.homeContainer}>
        {/*Header*/}
        <View style={styles.addHeader}>
          <Text style={styles.addTitle}>Add a new account</Text>
          <Ionicons
            name="close-outline"
            size={32}
            style={styles.closeIcon}
            onPress={() => navigation.pop()}
          />
        </View>
        <Text style={styles.addSubTitle}>
          You can store username, password or any other details for an online account like Gmail,
          Facebook or Netflix!
        </Text>
        {/* Account Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name={accountIcon ?? "at-circle-outline"}
            size={64}
            style={{ color: myColors.textColor }}
          />
        </View>
        {/*Enter the account name */}
        <TextInput
          placeholder="Account (ex: Google)"
          placeholderTextColor={myColors.tintPrimaryColor}
          value={accountName}
          onChangeText={(t) => {
            setAccountName(t);
            setAccountIcon(findIcon(t));
          }}
          style={styles.accountNameInput}
        />
        {/*Save user name */}
        <TextInput
          placeholder="User/Account ID"
          placeholderTextColor={myColors.tintPrimaryColor}
          value={accountUserName}
          onChangeText={(t) => {
            setAccountUserName(t);
          }}
          style={styles.accountNameInput}
        />
        {/*Save password */}
        <TextInput
          placeholder="Password/PIN/Number"
          placeholderTextColor={myColors.tintPrimaryColor}
          value={accountPassword}
          onChangeText={(t) => {
            setAccountPassword(t);
          }}
          style={styles.accountNameInput}
        />
        {/*Save notes - optional */}
        <TextInput
          placeholder="Any notes/details (Optional)"
          placeholderTextColor={myColors.tintPrimaryColor}
          value={accountNotes}
          multiline={true}
          numberOfLines={3}
          onChangeText={(t) => {
            setAccountNotes(t);
          }}
          style={styles.multipleInput}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={async () => {
            if (netInfo.isConnected){
              if (accountName!="" && accountUserName!="" && accountPassword!=""){
                //Create data to be added
                const accountTime = Date.now().toString();
                const data = {
                  accountName: accountName,
                  accountUserName: accountUserName,
                  accountPassword: accountPassword,
                  accountNotes: accountNotes,
                  accountTime:accountTime,
                }
                //Add account to local storage
                const accounts:string[] = JSON.parse(await getLocalData("accounts")??"[]")
                AsyncStorage.setItem("accounts",JSON.stringify([...accounts,accountTime]))
                AsyncStorage.setItem(accountTime,JSON.stringify(data))
                //Add account to DB
                await addAccountPasswordToDB(
                  deviceUser.email,
                  accountTime,
                  accountName,
                  accountUserName,
                  accountPassword,
                  accountNotes
                )
                //Go to home screen
                navigation.replace("Home");
              } else {
                Alert.alert("Please provide required fields")
              }
            } else {
              //No internet
              Alert.alert("You are not connected to the internet")
            }
          }}
        >
          <Text style={styles.addButtonText}>SAVE</Text>
        </TouchableOpacity>
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
  addHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  addTitle: {
    flex: 1,
    fontSize: myFontSizes.xl,
    fontFamily: myFontFamilies.bold,
    color: myColors.textColor,
  },
  closeIcon: {
    color: myColors.tintTextColor,
  },
  addSubTitle: {
    width: "100%",
    fontSize: myFontSizes.small,
    fontFamily: myFontFamilies.regular,
    marginVertical: 16,
    color: myColors.tintTextColor,
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
  },
  multipleInput: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.regular,
    color: myColors.textColor,
    backgroundColor: myColors.tintBackgroundColor,
    width: "100%",
    height: 96,
    marginVertical: 16,
    borderRadius: 8,
  },
  addButton: {
    borderRadius: 8,
    paddingHorizontal: 32,
    textAlign:"center",
    paddingVertical: 12,
    marginVertical: 16,
    backgroundColor: myColors.tintPrimaryColor,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    color: myColors.backgroundColor,
  },
});
