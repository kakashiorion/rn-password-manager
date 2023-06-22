import React, { useCallback, useEffect, useContext, useState } from "react";
import {
  FlatList,
  TextInput,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { AccountListItem } from "../../components/containers/AccountListItem";
import { HomeStackParamList, myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import {
  UserContext,
  getAllAccountPasswordsFromDB,
  getLocalData,
} from "../../utils/methods";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DocumentData } from "firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";

export default function HomeScreen({ navigation }: { navigation: NativeStackScreenProps<HomeStackParamList, 'Home'>['navigation'] }) {
  
  const deviceUser = useContext(UserContext);
  const [accounts, setAccounts] = useState([] as DocumentData[]);
  const [filteredAccounts, setFilteredAccounts] = useState(
    [] as DocumentData[]
  );
  const netInfo = useNetInfo()

  const getUserAccounts = useCallback(async (connected:boolean|null)=>{
    let dataArray: DocumentData[] = [];
    if (connected){
      //Connected.. get accounts from DB
      const dataFromDB = await getAllAccountPasswordsFromDB(deviceUser.email);
      dataFromDB.forEach((item) => dataArray.push(item.data()));
    } else {
      //Not connected.. get accounts from local storage
      const localData:string[] = JSON.parse(await getLocalData("accounts")??"[]")
      if(localData.length > 0) {
        localData.forEach(async (item:string)=>dataArray.push(JSON.parse(await getLocalData(item)??"")))
      }
    }
    setAccounts(dataArray);
    setFilteredAccounts(dataArray);
  },[])

  useEffect(()=>{
    getUserAccounts(netInfo.isConnected)
  },[netInfo]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.homeContainer}>
        <View  style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Hi {deviceUser.username}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.push("Settings")}
          >
            <Ionicons name="settings" size={32} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInputText}
            placeholder="Search"
            placeholderTextColor={myColors.tintTextColor}
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
        <Text style={styles.listTitle}>Your saved accounts</Text>
        {/* List of accounts */}
        <View style={styles.listContainer}>
          <FlatList
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Image
                  source={require("../../assets/security.png")}
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyText}>
                  No accounts found.. Start adding now!
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push("ViewAccount", {
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
          onPress={() => {
            navigation.push("AddAccount")
          }}
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
    backgroundColor: myColors.shadePrimaryColor,
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContainer:{
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  welcomeText: {
    fontFamily: myFontFamilies.bold,
    color: myColors.textColor,
    fontSize: myFontSizes.xl,
    flex:1,
    marginBottom:8,
  },
  searchContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: myColors.backgroundColor,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  searchIcon: {
    color: myColors.tintPrimaryColor,
  },
  searchInputText: {
    fontFamily: myFontFamilies.regular,
    fontSize: myFontSizes.regular,
    flex: 1,
    marginRight: 8,
    color: myColors.tintPrimaryColor,
  },
  listTitle: {
    fontSize: myFontSizes.regular,
    color: myColors.tintTextColor,
    fontFamily: myFontFamilies.bold,
    marginHorizontal: 4,
    marginVertical:4,
    alignSelf: "flex-start",
  },
  listContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: myColors.tintBackgroundColor,
    borderRadius: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 8,
    marginBottom: 24,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height:"100%"
  },
  emptyImage: {
    resizeMode: "contain",
    width: "80%",
    height: 172,
  },
  emptyText: {
    fontSize: myFontSizes.regular,
    color: myColors.tintTextColor,
    fontFamily: myFontFamilies.regular,
    flex: 1,
    textAlign: "center",
    marginTop: 16,
    marginHorizontal: 64,
  },
  flatList: {
    width: "100%",
  },
  addButton: {
    height: 64,
    width: 64,
    borderRadius: 64,
    backgroundColor: myColors.textColor,
    position: "absolute",
    bottom: 24,
    shadowRadius: 1,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    color: myColors.backgroundColor,
  },
  settingsButton:{
    height: 32,
    width: 32,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    color: myColors.tintTextColor,
  },
});
