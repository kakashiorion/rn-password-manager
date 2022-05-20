import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AccountListItem } from "../../components/containers/AccountListItem";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import {
  getAllAccountPasswordsFromDB,
  getLocalData,
} from "../../utils/methods";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DocumentData } from "firebase/firestore";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [deviceUser, setDeviceUser] = useState({
    username: "",
    email: "",
    pin: "",
  });
  const [accounts, setAccounts] = useState([] as any);
  const [filteredAccounts, setFilteredAccounts] = useState([] as any);

  useEffect(() => {
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
  }, [accounts]);
  return (
    <View style={styles.homeContainer}>
      {/* Welcome header */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Hi {deviceUser.username}!</Text>
        <View style={styles.profilePicContainer}></View>
      </View>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInputText}
          placeholder="Search"
          onChangeText={(t) => {
            setFilteredAccounts(
              accounts.filter((item: any) =>
                item.accountName.toLowerCase().includes(t.toLowerCase())
              )
            );
          }}
        />
        <Ionicons name="search" size={20} style={styles.searchIcon} />
      </View>
      {/* List of passwords */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Your saved passwords</Text>
        <FlatList
          renderItem={({ item }) => (
            <AccountListItem
              accountName={item.accountName}
              password={item.password}
            />
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
  );
}

const sampleAccountData = {
  accountName: "React",
  password: "1234567",
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: myColors.primaryColor,
    paddingTop: Platform.OS === "ios" ? 48 : 36,
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
  welcomeText: {
    fontFamily: myFontFamilies.bold,
    color: myColors.whiteColor,
    fontSize: myFontSizes.xl,
  },
  profilePicContainer: {
    width: 48,
    height: 48,
    backgroundColor: myColors.tertiaryColor,
    borderRadius: 16,
  },
  searchContainer: {
    paddingVertical: 16,
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
  },
  listContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: myColors.whiteColor,
    borderRadius: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 16,
  },
  listTitle: {
    fontSize: myFontSizes.regular,
    color: myColors.secondaryColor,
    fontFamily: myFontFamilies.bold,
    marginHorizontal: 4,
    marginTop: 4,
    marginBottom: 8,
  },
  flatList: {
    width: "100%",
  },
  addButton: {
    height: 64,
    width: 64,
    borderRadius: 64,
    backgroundColor: myColors.secondaryColor,
    position: "absolute",
    right: 16,
    bottom: 16,
    shadowRadius: 4,
    shadowColor: myColors.darkGrayColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    color: myColors.tertiaryColor,
  },
});
