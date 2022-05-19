import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import { getLocalData } from "../../utils/methods";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddAccountScreen from "./addAccountScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainStack = createNativeStackNavigator();

export default function MainScreen({ navigation }: { navigation: any }) {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainHome"
        component={MainHomeScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <MainStack.Screen
        name="AddAccount"
        component={AddAccountScreen}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
    </MainStack.Navigator>
  );
}

function MainHomeScreen({ navigation }: { navigation: any }) {
  const [deviceUser, setDeviceUser] = useState({
    username: "",
    email: "",
    pin: "",
  });
  useEffect(() => {
    getLocalData("user").then((data) => {
      if (data) {
        setDeviceUser(JSON.parse(data));
      }
    });
  }, []);
  return (
    <View style={styles.homeContainer}>
      {/* Welcome header */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Hi {deviceUser.username}!</Text>
        <View style={styles.profilePicContainer}></View>
      </View>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInputText} placeholder="Search" />
        <Ionicons name="search" size={20} style={styles.searchIcon} />
      </View>
      {/* List of passwords */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Your saved passwords</Text>
        <FlatList
          renderItem={({ item }) => <ListItem item={item} />}
          data={["A", "B", "C", "A", "B", "C", "A", "B", "C", "A", "B", "C"]}
          style={styles.flatList}
        ></FlatList>
      </View>
      {/* Add Account Button*/}
      <View style={styles.addButton}>
        <Ionicons
          name="add"
          size={32}
          style={styles.addIcon}
          onPress={() => navigation.navigate("AddAccount")}
        />
      </View>
    </View>
  );
}

function ListItem(props: any) {
  return (
    <View style={styles.listItem}>
      <Text>{props.item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: myColors.primaryColor,
    paddingTop: Platform.OS === "ios" ? 48 : 24,
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
    marginBottom: 8,
  },
  flatList: {
    width: "100%",
  },
  listItem: {
    height: 80,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: myColors.lightGrayColor,
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
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    color: myColors.tertiaryColor,
  },
});
