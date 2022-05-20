import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  addAccountPasswordToDB,
  findIcon,
  getLocalData,
} from "../../utils/methods";

export default function AddAccountScreen({ navigation }: { navigation: any }) {
  const [accountIcon, setAccountIcon] = useState("at-circle-outline" as any);
  const [accountName, setAccountName] = useState("");
  const [accountPassword, setAccountPassword] = useState("");

  const [deviceUser, setDeviceUser] = useState({
    username: "",
    email: "",
    pin: "",
  });

  useEffect(() => {
    (async () => {
      await getLocalData("user").then((data) => {
        if (data) {
          setDeviceUser(JSON.parse(data));
        }
      });
    })();
  }, []);

  return (
    //Background Container
    <View style={styles.homeContainer}>
      {/* Main Container */}
      <View style={styles.mainContainer}>
        {/*Header*/}
        <View style={styles.addHeader}>
          <Text style={styles.addTitle}>Add a new account</Text>
          <Ionicons
            name="close-outline"
            size={32}
            style={styles.closeIcon}
            onPress={() => navigation.goBack()}
          />
        </View>
        {/* Account Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name={accountIcon ?? "at-circle-outline"}
            size={64}
            style={{ color: myColors.secondaryColor }}
          />
        </View>
        {/*Enter account name */}
        <TextInput
          placeholder="Account name (ex: Gmail)"
          onChangeText={(t) => {
            setAccountName(t);
            setAccountIcon(findIcon(t));
          }}
          style={styles.accountNameInput}
        />
        {/*Save password */}
        <TextInput
          placeholder="Password/PIN"
          onChangeText={(t) => {
            setAccountPassword(t);
          }}
          style={styles.accountNameInput}
          secureTextEntry={false}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={async () => {
            addAccountPasswordToDB(
              deviceUser.email,
              accountName,
              accountPassword
            );
            navigation.navigate("HomeScreen");
          }}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
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
    backgroundColor: myColors.whiteColor,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  addHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  addTitle: {
    flex: 1,
    fontSize: myFontSizes.large,
    fontFamily: myFontFamilies.bold,
  },
  closeIcon: {
    color: myColors.redColor,
  },
  iconContainer: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 4,
    borderColor: myColors.primaryColor,
    marginVertical: 16,
  },
  accountNameInput: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: myFontSizes.large,
    fontFamily: myFontFamilies.regular,
    color: myColors.secondaryColor,
    backgroundColor: myColors.lightGrayColor,
    width: "100%",
    marginVertical: 16,
    borderRadius: 16,
  },
  addButton: {
    paddingHorizontal: 32,
    marginVertical: 16,
    borderRadius: 16,
    paddingVertical: 16,
    backgroundColor: myColors.primaryColor,
    shadowRadius: 4,
    shadowColor: myColors.lightGrayColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    elevation: 4,
  },
  addButtonText: {
    fontSize: myFontSizes.large,
    fontFamily: myFontFamilies.bold,
    color: myColors.whiteColor,
  },
});
