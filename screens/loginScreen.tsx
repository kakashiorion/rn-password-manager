import React, { useEffect, useState } from "react";
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
import { getLocalData } from "../utils/methods";
import { myColors, myFontFamilies, myFontSizes } from "../styles/global";

const bgImageUrl = "iceBG.jpg";
const logoUrl = "PMLogo.png";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [pinTextValue, setPinTextValue] = useState("");
  const [fingerAllowed, setFingerAllowed] = useState(false);
  // const [forgotPin, setForgotPin] = useState(false);
  const [deviceUser, setDeviceUser] = useState({
    username: "",
    email: "",
    pin: "",
  });
  // const [email, setEmail] = useState("");

  const authenticateFingerprint = async () => {
    const supportedAuths =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (supportedAuths.includes(1)) {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        navigation.navigate("Home", {
          username: deviceUser.username,
          email: deviceUser.email,
        });
      }
    }
  };
  useEffect(() => {
    (async () => {
      await getLocalData("user").then((data) => {
        if (data) {
          setDeviceUser(JSON.parse(data));
        }
      });
      await authenticateFingerprint();
      const result =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (result.includes(1)) {
        setFingerAllowed(true);
      }
    })();
  }, []);

  const handleInput = (value: string) => {
    setPinTextValue(value);
    if (value.length > 3) {
      //Try to match entered PIN
      const devicePin = deviceUser.pin;
      if (devicePin == value) {
        // If PIN matches, navigate to Home Screen
        navigation.navigate("Home", {
          username: deviceUser.username,
          email: deviceUser.email,
        });
      } else {
        //If PIN does not match, show alert
        Alert.alert("Incorrect PIN");
        //Also start showing forgot PIN CTA
        // setForgotPin(true);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            To securely access your data, please enter your PIN
          </Text>
          <Text style={styles.headerText}>Enter PIN</Text>

          <TextInput
            style={styles.pinInput}
            placeholder="0000"
            keyboardType="numeric"
            value={pinTextValue}
            onChangeText={handleInput}
            textAlign="center"
          />
          {/* {forgotPin ? ( */}
          <Text
            style={styles.forgotText}
            onPress={() => {
              navigation.navigate("RetrievePin", {
                username: deviceUser.username,
              });
            }}
          >
            Forgot your pin?
          </Text>
          {/* ) : null} */}
          {fingerAllowed ? (
            <>
              <Text style={[styles.headerText, styles.orText]}>OR</Text>
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
    paddingVertical: 64,
  },
  mainContainer: {
    width: "100%",
    backgroundColor: myColors.whiteColor,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: myColors.secondaryColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
    // minHeight: "70%",
  },
  subTitleText: {
    fontFamily: myFontFamilies.regular,
    marginTop: 4,
    marginBottom: 8,
    fontSize: myFontSizes.small,
    textAlign: "center",
    color: myColors.darkGrayColor,
  },
  upperRightCircle: {
    backgroundColor: myColors.tertiaryColor,
    opacity: 0.8,
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
    top: -80,
    right: -120,
  },
  lowerRightCircle: {
    backgroundColor: myColors.tertiaryColor,
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
    height: 64,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: myFontSizes.xl,
    textAlign: "center",
    margin: 16,
    fontFamily: myFontFamilies.bold,
  },
  headerText: {
    fontSize: myFontSizes.large,
    textAlign: "center",
    marginTop: 8,
    fontFamily: myFontFamilies.bold,
  },
  forgotText: {
    fontSize: myFontSizes.xs,
    textDecorationLine: "underline",
    fontFamily: myFontFamilies.regular,
    color: myColors.darkGrayColor,
  },
  pinInput: {
    fontSize: myFontSizes.xl,
    borderRadius: 8,
    borderColor: myColors.secondaryColor,
    borderWidth: 2,
    padding: 8,
    marginVertical: 16,
    letterSpacing: 8,
    fontFamily: myFontFamilies.bold,
    textAlign: "center",
    width: 128,
    color: myColors.secondaryColor,
  },
  orText: {
    fontSize: myFontSizes.regular,
    textAlign: "center",
    marginVertical: 32,
    fontFamily: myFontFamilies.bold,
    color: myColors.darkGrayColor,
  },
  fpText: {
    fontSize: myFontSizes.small,
    textAlign: "center",
    fontFamily: myFontFamilies.regular,
    textDecorationLine: "underline",
  },
});
