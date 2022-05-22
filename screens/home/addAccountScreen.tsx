import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  const [accountUserName, setAccountUserName] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountNotes, setAccountNotes] = useState("");

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
    <Pressable style={styles.homeContainer} onPress={Keyboard.dismiss}>
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
            style={{ color: myColors.darkColor }}
          />
        </View>
        <Text style={styles.addSubTitle}>
          You can store username and password for an online account like Gmail,
          Facebook!
        </Text>
        {/*Enter the account name */}
        <TextInput
          placeholder="Account name (ex: Gmail)"
          value={accountName}
          onChangeText={(t) => {
            setAccountName(t);
            setAccountIcon(findIcon(t));
          }}
          style={styles.accountNameInput}
        />
        {/*Save user name */}
        <TextInput
          placeholder="Username [Optional]"
          value={accountUserName}
          onChangeText={(t) => {
            setAccountUserName(t);
          }}
          style={styles.accountNameInput}
        />
        {/*Save password */}
        <TextInput
          placeholder="Password/PIN"
          value={accountPassword}
          onChangeText={(t) => {
            setAccountPassword(t);
          }}
          style={styles.accountNameInput}
        />
        {/*Save notes - optional */}
        <TextInput
          placeholder="Any notes (Optional)"
          value={accountNotes}
          multiline={true}
          numberOfLines={3}
          onChangeText={(t) => {
            setAccountNotes(t);
          }}
          style={styles.accountNameInput}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={async () => {
            await addAccountPasswordToDB(
              deviceUser.email,
              accountName,
              accountUserName,
              accountPassword,
              accountNotes
            ).then(() => navigation.navigate("HomeScreen"));
          }}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
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
    color: myColors.darkColor,
  },
  addSubTitle: {
    width: "100%",
    fontSize: myFontSizes.xs,
    fontFamily: myFontFamilies.regular,
    marginBottom: 8,
    color: myColors.darkColor,
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
    marginVertical: 8,
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
  addButton: {
    paddingHorizontal: 24,
    marginVertical: 8,
    borderRadius: 32,
    paddingVertical: 8,
    backgroundColor: myColors.primaryColor,
    shadowRadius: 4,
    shadowColor: myColors.lightGrayColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    color: myColors.lightColor,
  },
});
