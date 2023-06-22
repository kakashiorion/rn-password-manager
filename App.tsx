import LoginScreen from "./screens/loginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { UserContext, emptyUser, getLocalData } from "./utils/methods";
import OnboardingScreen from "./screens/onboardingScreen";
import SignupScreen from "./screens/signupScreen";
import { useCallback, useEffect, useState } from "react";
import SetPinScreen from "./screens/setPinScreen";
import RetrievePinScreen from "./screens/retrievePinScreen";
import ResetPinScreen from "./screens/resetPinScreen";
import * as SplashScreen from "expo-splash-screen";
import HomeScreenStack from "./screens/home/homeScreenStack";

const LoginStack = createNativeStackNavigator();
const SignupStack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    NotoRegular: require("./assets/NotoSans-Regular.ttf"),
    NotoBold: require("./assets/NotoSans-Bold.ttf"),
  });
  
  const [deviceUser, setDeviceUser] = useState(emptyUser);

  const fetchData = useCallback(async ()=>{
    await getLocalData("user").then((data) => {
      if (data) {
        setDeviceUser(JSON.parse(data));
      }
    });
  },[])

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
    fetchData();
  }, [deviceUser]);

  if (!loaded) {
    return null;
  }
  return (
    <UserContext.Provider value={deviceUser}>
    <NavigationContainer>
      {deviceUser.email!="" ? (
        <LoginStack.Navigator initialRouteName="Login">
          <LoginStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <LoginStack.Screen
            name="Home"
            component={HomeScreenStack}
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
            name="ResetPin"
            component={ResetPinScreen}
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
            name="Home"
            component={HomeScreenStack}
            options={{
              headerShown: false,
            }}
          />
        </SignupStack.Navigator>
      )}
    </NavigationContainer>
    </UserContext.Provider>

  );
}
