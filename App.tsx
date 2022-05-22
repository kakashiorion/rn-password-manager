import LoginScreen from "./screens/loginScreen";
import MainScreen from "./screens/mainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { getLocalData } from "./utils/methods";
import OnboardingScreen from "./screens/onboardingScreen";
import SignupScreen from "./screens/signupScreen";
import { useEffect, useState } from "react";
import SetPinScreen from "./screens/setPinScreen";
import RetrievePinScreen from "./screens/retrievePinScreen";
import ResetPinScreen from "./screens/resetPinScreen";
import * as SplashScreen from "expo-splash-screen";

const LoginStack = createNativeStackNavigator();
const SignupStack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    NotoRegular: require("./assets/NotoSans-Regular.ttf"),
    NotoBold: require("./assets/NotoSans-Bold.ttf"),
  });
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
    getLocalData("user").then((data) => {
      if (data) {
        setUserExists(true);
      }
    });
  }, []);

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      {userExists ? (
        <LoginStack.Navigator initialRouteName="Login">
          <LoginStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <LoginStack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
          <LoginStack.Screen
            name="RetrievePin"
            component={RetrievePinScreen}
            options={{
              headerShown: false,
            }}
          />
          <LoginStack.Screen
            name="ResetPin"
            component={ResetPinScreen}
            options={{
              headerShown: false,
            }}
          />
          <LoginStack.Screen
            name="SetPin"
            component={SetPinScreen}
            options={{
              headerShown: false,
            }}
          />
        </LoginStack.Navigator>
      ) : (
        <SignupStack.Navigator initialRouteName="Onboarding">
          <SignupStack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              headerShown: false,
            }}
          />
          <SignupStack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              headerShown: false,
            }}
          />
          <SignupStack.Screen
            name="SetPin"
            component={SetPinScreen}
            options={{
              headerShown: false,
            }}
          />
          <SignupStack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
        </SignupStack.Navigator>
      )}
    </NavigationContainer>
  );
}
