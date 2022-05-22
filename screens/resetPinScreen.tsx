import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { myColors, myFontFamilies, myFontSizes } from "../styles/global";
import { getUserData } from "../utils/methods";
import { RouteProp } from "@react-navigation/native";

const bgImageUrl = "mainBackgroundImage.jpg";
const logoUrl = "PMLogo.png";

export default function ResetPinScreen({
  route,
  navigation,
}: {
  route: RouteProp<{ params: { username: string; email: string } }, "params">;
  navigation: any;
}) {
  const [codeTextValue, setCodeTextValue] = useState("");
  const handleInput = async (value: string) => {
    setCodeTextValue(value);
    if (value.length > 5) {
      //Try to match entered code from DB
      const dbCode = await getUserData(route.params.email);
      // If Code matches, navigate to Home Screen
      if (dbCode.exists() && dbCode.data()["code"] == value) {
        navigation.navigate("SetPin", {
          username: route.params.username,
          email: route.params.email,
        });
      } else {
        //If Code does not match, show alert
        Alert.alert("Incorrect Code. Please check again!");
      }
      //Clear Code field text
      setCodeTextValue("");
    }
  };

  return (
    <ImageBackground
      source={require(`../assets/${bgImageUrl}`)}
      style={styles.bgImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.mainContainer}>
          <View style={styles.upperLeftCircle}></View>
          <View style={styles.lowerRightCircle}></View>
          <Image
            source={require(`../assets/${logoUrl}`)}
            style={styles.logoImage}
          ></Image>
          <Text style={styles.titleText}>Hi {route.params.username}!</Text>
          <Text style={styles.subTitleText}>
            We have sent a special 6-digit code to your email address!
          </Text>
          <Text style={styles.subTitleText}>{route.params.email}</Text>
          <Text
            style={styles.changeEmailText}
            onPress={() => {
              navigation.goBack();
            }}
          >
            (Not your emailID?)
          </Text>
          <Text style={styles.headerText}>Enter the code below!</Text>

          <TextInput
            style={styles.codeInput}
            placeholder="000000"
            keyboardType="numeric"
            value={codeTextValue}
            onChangeText={handleInput}
            textAlign="center"
          />
          <Text
            style={styles.rememberText}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            I remember my PIN!
          </Text>
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
    backgroundColor: myColors.lightColor,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: myColors.darkColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  upperLeftCircle: {
    backgroundColor: myColors.tertiaryColor,
    opacity: 0.8,
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
    top: -120,
    left: -80,
  },
  lowerRightCircle: {
    backgroundColor: myColors.tertiaryColor,
    opacity: 0.8,
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    bottom: -70,
    right: 50,
  },
  changeEmailText: {
    fontSize: myFontSizes.xs,
    textDecorationLine: "underline",
    fontFamily: myFontFamilies.regular,
    color: myColors.primaryColor,
    marginBottom: 16,
  },
  rememberText: {
    marginVertical: 16,
    fontSize: myFontSizes.xs,
    textDecorationLine: "underline",
    fontFamily: myFontFamilies.regular,
    color: myColors.primaryColor,
  },
  logoImage: {
    width: "100%",
    height: "10%",
    resizeMode: "contain",
  },
  titleText: {
    fontFamily: myFontFamilies.bold,
    marginTop: 8,
    fontSize: myFontSizes.xl,
    textAlign: "center",
    color: myColors.darkColor,
  },
  subTitleText: {
    fontFamily: myFontFamilies.regular,
    marginTop: 4,
    marginBottom: 8,
    fontSize: myFontSizes.small,
    textAlign: "center",
    color: myColors.darkGrayColor,
  },
  headerText: {
    fontSize: myFontSizes.large,
    textAlign: "center",
    marginTop: 8,
    fontFamily: myFontFamilies.bold,
  },
  codeInput: {
    fontSize: myFontSizes.xl,
    borderRadius: 8,
    borderColor: myColors.darkColor,
    borderWidth: 2,
    padding: 8,
    marginVertical: 16,
    letterSpacing: 8,
    fontFamily: myFontFamilies.bold,
    textAlign: "center",
    width: 192,
    color: myColors.darkColor,
  },
});
