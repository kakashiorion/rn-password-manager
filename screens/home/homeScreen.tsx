import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  View,
  Image,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AccountListItem } from "../../components/containers/AccountListItem";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import {
  getAllAccountPasswordsFromDB,
  getLocalData,
} from "../../utils/methods";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DocumentData } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [deviceUser, setDeviceUser] = useState({
    username: "",
    email: "",
    pin: "",
  });

  const [deviceSettings, setDeviceSettings] = useState({
    fingerprint: false,
    imageURL: "../../assets/avatar.jpg",
  });

  const [accounts, setAccounts] = useState([] as DocumentData[]);
  const [filteredAccounts, setFilteredAccounts] = useState(
    [] as DocumentData[]
  );

  useFocusEffect(
    React.useCallback(() => {
      getLocalData("user")
        .then((data) => {
          if (data) {
            const userData = JSON.parse(data);
            setDeviceUser(userData);
            return userData;
          }
        })
        .then(async (data) => {
          const dataFromDB = await getAllAccountPasswordsFromDB(data.email);
          let dataArray: DocumentData[] = [];
          dataFromDB.forEach((item) => dataArray.push(item.data()));
          setAccounts(dataArray);
          setFilteredAccounts(dataArray);
        });
      getLocalData("settings").then((data) => {
        if (data) {
          setDeviceSettings(JSON.parse(data));
        }
      });
    }, [])
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.homeContainer}>
        <View style={styles.upperLeftCircle}></View>
        <View style={styles.lowerRightCircle}></View>
        {/* Welcome header */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hi {deviceUser.username}!</Text>
          <Image
            source={{
              uri: deviceSettings.imageURL,
            }}
            style={styles.profilePicContainer}
          />
        </View>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInputText}
            placeholder="Search"
            onChangeText={(t) => {
              setFilteredAccounts(
                accounts.filter(
                  (item: DocumentData) =>
                    item.accountName.toLowerCase().includes(t.toLowerCase()) ||
                    item.accountUserName.toLowerCase().includes(t.toLowerCase())
                )
              );
            }}
          />
          <Ionicons name="search" size={20} style={styles.searchIcon} />
        </View>
        <Text style={styles.listTitle}>Your saved passwords</Text>
        {/* List of passwords */}
        <View style={styles.listContainer}>
          <FlatList
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Image
                  source={require("../../assets/security.png")}
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyText}>
                  No passwords saved yet.. Start now!
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewAccount", {
                    account: item,
                    email: deviceUser.email,
                  })
                }
              >
                <AccountListItem
                  accountName={item.accountName}
                  accountUserName={item.accountUserName}
                  accountPassword={item.accountPassword}
                />
              </TouchableOpacity>
            )}
            data={filteredAccounts}
            style={styles.flatList}
          ></FlatList>
        </View>
        {/* Add Account Button*/}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddAccount")}
        >
          <Ionicons name="add" size={32} style={styles.addIcon} />
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
    backgroundColor: myColors.primaryColor,
    paddingTop: Platform.OS === "ios" ? 32 : 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 8,
  },
  upperLeftCircle: {
    backgroundColor: myColors.tertiaryColor,
    opacity: 0.7,
    width: 300,
    height: 300,
    borderRadius: 150,
    position: "absolute",
    top: 100,
    left: -150,
  },
  lowerRightCircle: {
    backgroundColor: myColors.tertiaryColor,
    opacity: 0.7,
    width: 200,
    height: 200,
    borderRadius: 150,
    position: "absolute",
    bottom: -110,
    right: -50,
  },
  welcomeText: {
    fontFamily: myFontFamilies.bold,
    color: myColors.lightColor,
    fontSize: myFontSizes.xl,
  },
  profilePicContainer: {
    width: 48,
    height: 48,
    backgroundColor: myColors.tertiaryColor,
    borderRadius: 24,
  },
  searchContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: myColors.lightGrayColor,
    borderRadius: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  searchIcon: {
    color: myColors.primaryColor,
  },
  searchInputText: {
    fontFamily: myFontFamilies.regular,
    fontSize: myFontSizes.regular,
    flex: 1,
    marginRight: 8,
    color: myColors.darkGrayColor,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: myColors.lightColor,
    borderRadius: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 8,
  },
  listTitle: {
    fontSize: myFontSizes.regular,
    color: myColors.lightColor,
    fontFamily: myFontFamilies.bold,
    marginHorizontal: 4,
    alignSelf: "flex-start",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    resizeMode: "contain",
    width: "80%",
    height: 256,
  },
  emptyText: {
    fontSize: myFontSizes.regular,
    color: myColors.darkColor,
    fontFamily: myFontFamilies.regular,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 64,
  },
  flatList: {
    width: "100%",
  },
  addButton: {
    height: 64,
    width: 64,
    borderRadius: 64,
    backgroundColor: myColors.darkColor,
    position: "absolute",
    // right: 16,
    bottom: 8,
    shadowRadius: 1,
    shadowColor: myColors.lightGrayColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    color: myColors.tertiaryColor,
  },
});
