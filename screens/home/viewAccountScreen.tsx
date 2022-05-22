import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  IconRevertDuration,
  myColors,
  myFontFamilies,
  myFontSizes,
} from "../../styles/global";
import { RouteProp } from "@react-navigation/native";
import { DocumentData } from "firebase/firestore";
import {
  addAccountPasswordToDB,
  deleteAccountFromDB,
  findIcon,
} from "../../utils/methods";
import * as Clipboard from "expo-clipboard";

export default function ViewAccountScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: RouteProp<
    { params: { account: DocumentData; email: string } },
    "params"
  >;
}) {
  const [accountIcon, setAccountIcon] = useState(
    findIcon(route.params.account.accountName) as any
  );
  const [accountName, setAccountName] = useState(
    route.params.account.accountName
  );
  const [accountUserName, setAccountUserName] = useState(
    route.params.account.accountUserName
  );
  const [accountPassword, setAccountPassword] = useState(
    route.params.account.accountPassword
  );
  const [accountNotes, setAccountNotes] = useState(
    route.params.account.accountNotes
  );
  const [passwordShown, setPasswordShown] = useState(true);
  const [copyIconName, setCopyIconName] = useState("copy" as any);
  const [copyIconColor, setCopyIconColor] = useState(myColors.lightColor);
  const [viewIconName, setViewIconName] = useState("eye" as any);
  const [viewIconColor, setViewIconColor] = useState(myColors.lightColor);

  return (
    //Background Container
    <View style={styles.homeContainer}>
      {/* Main Container */}
      <View style={styles.mainContainer}>
        {/*Header*/}
        <View style={styles.viewHeader}>
          <Ionicons
            name="arrow-back"
            size={32}
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.viewTitle}>Account Details</Text>
        </View>
        {/* Account Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name={accountIcon ?? "at-circle-outline"}
            size={64}
            style={{ color: myColors.darkColor }}
          />
        </View>
        {/*View account name */}
        <TextInput
          placeholder="Account name (ex: Gmail)"
          editable={false}
          value={route.params.account.accountName}
          onChangeText={(t) => {
            setAccountName(t);
            setAccountIcon(findIcon(t));
          }}
          style={styles.accountNameInput}
        />
        {/*View user name */}
        <TextInput
          placeholder="User name [Optional]"
          value={accountUserName}
          onChangeText={(t) => {
            setAccountUserName(t);
          }}
          style={styles.accountNameInput}
        />
        {/*View password */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password/PIN"
            value={route.params.account.accountPassword}
            onChangeText={(t) => {
              setAccountPassword(t);
            }}
            style={[styles.accountNameInput, styles.accountPasswordInput]}
            secureTextEntry={passwordShown}
          />
          <TouchableOpacity
            style={[
              styles.viewButtonContainer,
              {
                backgroundColor:
                  viewIconName == "eye"
                    ? myColors.tertiaryColor
                    : myColors.lightColor,
                borderColor:
                  viewIconName == "eye"
                    ? myColors.tertiaryColor
                    : myColors.primaryColor,
                shadowColor:
                  viewIconName == "eye"
                    ? myColors.tertiaryColor
                    : myColors.primaryColor,
              },
            ]}
            onPress={() => {
              //Switch to eye icon on-off when clicked
              setViewIconColor(
                viewIconName == "eye"
                  ? myColors.primaryColor
                  : myColors.lightColor
              );
              setViewIconName(viewIconName == "eye" ? "eye-off" : "eye");
              setPasswordShown(!passwordShown);
            }}
          >
            <Ionicons
              name={viewIconName ?? ""}
              size={20}
              style={{ color: viewIconColor }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.copyButtonContainer,
              {
                backgroundColor:
                  copyIconName == "copy"
                    ? myColors.darkGrayColor
                    : myColors.lightColor,
                borderColor:
                  copyIconName == "copy"
                    ? myColors.darkGrayColor
                    : myColors.primaryColor,
                shadowColor:
                  copyIconName == "copy"
                    ? myColors.darkGrayColor
                    : myColors.primaryColor,
              },
            ]}
            onPress={async () => {
              await Clipboard.setStringAsync(accountPassword);
              //Change to checkmark icon when clicked
              setCopyIconName("checkmark-outline");
              setCopyIconColor(myColors.primaryColor);
              ToastAndroid.show("Copied!", IconRevertDuration);
              //Change back to copy icon after 2 seconds
              setTimeout(() => {
                setCopyIconName("copy");
                setCopyIconColor(myColors.lightColor);
              }, IconRevertDuration);
            }}
          >
            <Ionicons
              name={copyIconName ?? "copy"}
              size={20}
              style={{ color: copyIconColor }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={async () => {
              addAccountPasswordToDB(
                route.params.email,
                accountName,
                accountUserName,
                accountPassword,
                accountNotes
              );
              navigation.navigate("HomeScreen");
            }}
          >
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={async () => {
              Alert.alert(
                "Delete details?",
                `Are you sure you want to delete saved details of your ${accountName} account?`,
                [
                  {
                    text: "Yes, Delete",
                    onPress: async () => {
                      deleteAccountFromDB(route.params.email, accountName);
                      navigation.navigate("HomeScreen");
                    },
                    style: "destructive",
                  },
                  { text: "Cancel", onPress: () => {} },
                ],
                { cancelable: true }
              );
            }}
          >
            <Text style={styles.deleteButtonText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: myColors.primaryColor,
    paddingTop: 48,
  },
  mainContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    flex: 1,
    backgroundColor: myColors.lightColor,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  viewHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16,
  },
  viewTitle: {
    flex: 1,
    fontSize: myFontSizes.large,
    fontFamily: myFontFamilies.bold,
  },
  backIcon: {
    color: myColors.darkColor,
    marginRight: 16,
  },
  iconContainer: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 4,
    borderColor: myColors.primaryColor,
    marginVertical: 8,
  },
  copyButtonContainer: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 1,
    shadowColor: myColors.darkGrayColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 1,
    marginLeft: 8,
  },
  viewButtonContainer: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 1,
    shadowColor: myColors.darkGrayColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 1,
    marginLeft: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountNameInput: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.regular,
    color: myColors.darkColor,
    backgroundColor: myColors.lightGrayColor,
    width: "100%",
    marginVertical: 8,
    borderRadius: 16,
  },
  accountPasswordInput: {
    flex: 1,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
  saveButton: {
    paddingHorizontal: 24,
    marginVertical: 8,
    borderRadius: 32,
    paddingVertical: 8,
    backgroundColor: myColors.primaryColor,
    shadowRadius: 1,
    shadowColor: myColors.darkGrayColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 1,
  },
  deleteButton: {
    paddingHorizontal: 24,
    marginVertical: 8,
    borderRadius: 32,
    paddingVertical: 8,
    backgroundColor: myColors.lightColor,
    shadowRadius: 4,
    borderColor: myColors.redColor,
    borderWidth: 1,
    shadowColor: myColors.lightGrayColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 1,
  },
  saveButtonText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    color: myColors.lightColor,
  },
  deleteButtonText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.regular,
    color: myColors.redColor,
  },
});
