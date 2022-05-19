import React from "react";
import { myColors, myFontFamilies, myFontSizes } from "../styles/global";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./home/mainScreen";
import SettingsScreen from "./home/settingsScreen";
import ProfileScreen from "./home/profileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform } from "react-native";

const BottomTab = createBottomTabNavigator();
export default function HomeScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: RouteProp<{ params: { username: string; email: string } }, "params">;
}) {
  const deviceUser = {
    email: route.params.email,
    username: route.params.username,
  };
  return (
    <NavigationContainer independent={true}>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: myFontSizes.xs,
            fontFamily: myFontFamilies.regular,
            paddingBottom: Platform.OS === "ios" ? 0 : 8,
          },
          tabBarStyle: {
            paddingTop: 8,
            height: Platform.OS === "ios" ? 84 : 68,
          },
          tabBarActiveTintColor: myColors.primaryColor,
          tabBarInactiveTintColor: myColors.darkGrayColor,
        })}
      >
        <BottomTab.Screen
          name="Home"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
