import React from "react";

import AddAccountScreen from "./addAccountScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewAccountScreen from "./viewAccountScreen";
import HomeScreen from "./homeScreen";
import SettingsScreen from "./settingsScreen";
import LoginScreen from "../loginScreen";

const HomeStack = createNativeStackNavigator();

export default function HomeScreenStack() {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <HomeStack.Screen
        name="AddAccount"
        component={AddAccountScreen}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <HomeStack.Screen
        name="ViewAccount"
        component={ViewAccountScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <HomeStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}
