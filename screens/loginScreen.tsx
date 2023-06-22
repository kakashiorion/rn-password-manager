import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { UserContext, getLocalData } from "../utils/methods";
import { RootStackParamList, myColors, myFontFamilies, myFontSizes } from "../styles/global";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const bgImageUrl = "iceBG.jpg";
const logoUrl = "PMLogo.png";

export default function LoginScreen({ navigation }: { navigation:NativeStackScreenProps<RootStackParamList, 'Login'>['navigation']
}) {
  const deviceUser = useContext(UserContext);
  const [pinTextValue, setPinTextValue] = useState("");
  const [fingerprintsettings, setFingerprintsettings] = useState(false);

  const authenticateFingerprint = async () => {
    const supportedAuths =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (supportedAuths.includes(1) && fingerprintsettings) {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        navigation.replace("Home");
      }
    }
  };

  useEffect(() => {
    getLocalData("fingerprint").then((data) => {
      if (data) {
        setFingerprintsettings(JSON.parse(data));
      }
    });
    authenticateFingerprint();
  }, []);

  const handleInput = (value: string) => {
    setPinTextValue(value);
    if (value.length > 3) {
      //Try to match entered PIN
      const devicePin = deviceUser.pin;
      if (devicePin == value) {
        // If PIN matches, login and navigate to Main Screen
        navigation.replace("Home");
      } else {
        //If PIN does not match, show alert
        Alert.alert("Incorrect PIN");
      }
      //Clear PIN field text
      setPinTextValue("");
    }
  };

  return (
    <ImageBackground
      source={require(`../assets/${bgImageUrl}`)}
      style={styles.bgImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <View style={styles.upperRightCircle}></View>
          <View style={styles.lowerRightCircle}></View>
          <Image
            source={require(`../assets/${logoUrl}`)}
            style={styles.logoImage}
          ></Image>
          <Text style={styles.welcomeText}>
            Welcome back, {deviceUser.username}!
          </Text>
          <Text style={styles.subTitleText}>
            To securely login, please enter your PIN
          </Text>
          <TextInput
            style={styles.pinInput}
            placeholder="Enter PIN"
            placeholderTextColor={myColors.tintPrimaryColor}
            keyboardType="numeric"
            secureTextEntry={true}            
            maxLength={4}
            value={pinTextValue}
            onChangeText={handleInput}
            textAlign="center"
          />
          <Text
            style={styles.forgotText}
            onPress={() => {
              navigation.push("RetrievePin", {
                username: deviceUser.username,
              });
            }}
          >
            Forgot your pin?
          </Text>
          {fingerprintsettings ? (
            <>
              <Text style={[styles.orText]}>OR</Text>
              <Text style={[styles.fpText]} onPress={authenticateFingerprint}>
                Scan your fingerprint
              </Text>
            </>
          ) : (
            <></>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 128,
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: myColors.backgroundColor,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  subTitleText: {
    fontFamily: myFontFamilies.regular,
    marginTop: 4,
    marginBottom: 8,
    fontSize: myFontSizes.small,
    textAlign: "center",
    color: myColors.tintTextColor,
  },
  upperRightCircle: {
    backgroundColor: myColors.primaryColor,
    opacity: 0.8,
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
    top: -80,
    right: -120,
  },
  lowerRightCircle: {
    backgroundColor: myColors.primaryColor,
    opacity: 0.8,
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    bottom: -70,
    left: 50,
  },
  logoImage: {
    width: "100%",
    height: "15%",
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: myFontSizes.xl,
    textAlign: "center",
    margin: 8,
    fontFamily: myFontFamilies.bold,
    color: myColors.textColor,
  },
  forgotText: {
    fontSize: myFontSizes.xs,
    textDecorationLine: "underline",
    fontFamily: myFontFamilies.regular,
    color: myColors.tintTextColor,
  },
  pinInput: {
    fontSize: myFontSizes.large,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: myColors.tintBackgroundColor,
    padding: 12,
    fontFamily: myFontFamilies.bold,
    textAlign: "center",
    width: "70%",
    color: myColors.primaryColor,
    letterSpacing: 2,
  },
  orText: {
    fontSize: myFontSizes.regular,
    textAlign: "center",
    marginVertical: 16,
    fontFamily: myFontFamilies.bold,
    color: myColors.tintBackgroundColor,
  },
  fpText: {
    fontSize: myFontSizes.regular,
    textAlign: "center",
    fontFamily: myFontFamilies.bold,
    textDecorationLine: "underline",
    color: myColors.tintTextColor,
  },
});
