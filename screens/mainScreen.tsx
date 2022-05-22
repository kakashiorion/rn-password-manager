import React from "react";
import { myColors, myFontFamilies, myFontSizes } from "../styles/global";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenStack from "./home/homeScreenStack";
import SettingsScreen from "./settings/settingsScreen";
import ProfileScreen from "./profile/profileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform } from "react-native";

const BottomTab = createBottomTabNavigator();

//This screen opens up and takes control when the user successfully logs in
export default function MainScreen({
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
          tabBarIcon: ({ focused, color }) => {
            let iconName: any;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarShowLabel: false,
          // tabBarLabelStyle: {
          //   fontSize: myFontSizes.xs,
          //   fontFamily: myFontFamilies.regular,
          //   paddingBottom: Platform.OS === "ios" ? 0 : 8,
          // },
          tabBarStyle: {
            backgroundColor: myColors.lightGrayColor,
            opacity: 0.8,
            height: Platform.OS === "ios" ? 84 : 64,
          },
          tabBarActiveTintColor: myColors.primaryColor,
          tabBarInactiveTintColor: myColors.darkColor,
        })}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreenStack}
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
