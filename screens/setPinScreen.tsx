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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";
import { createUserWithEmail } from "../utils/methods";

const bgImageUrl = "mainBackgroundImage.jpg";
const logoUrl = "PMLogo.png";

export default function SetPinScreen({
  route,
  navigation,
}: {
  route: RouteProp<{ params: { username: string; email: string } }, "params">;
  navigation: any;
}) {
  const [firstPin, setFirstPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

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
            Great! Set a new pin which you can use to login from now on!
          </Text>
          <TextInput
            style={styles.pinInput}
            placeholder="Set PIN"
            value={firstPin}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={(t: string) => setFirstPin(t)}
          />
          <TextInput
            style={styles.pinInput}
            placeholder="Re-enter PIN"
            value={confirmPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry={true}
            onChangeText={(t: string) => {
              setConfirmPin(t);
              if (t.length > 3) {
                if (t == firstPin) {
                  Alert.alert(" PIN set successfully!");
                  AsyncStorage.setItem(
                    "user",
                    JSON.stringify({
                      username: route.params.username,
                      email: route.params.email,
                      pin: t,
                    })
                  );
                  navigation.navigate("Main", {
                    username: route.params.username,
                    email: route.params.email,
                  });
                  createUserWithEmail(
                    route.params.email,
                    route.params.username
                  );
                } else {
                  Alert.alert("PIN does not match");
                  setConfirmPin("");
                }
              }
            }}
          />
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
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  upperLeftCircle: {
    backgroundColor: myColors.primaryColor,
    opacity: 0.8,
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
    top: -120,
    left: -80,
  },
  lowerRightCircle: {
    backgroundColor: myColors.primaryColor,
    opacity: 0.8,
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    bottom: -70,
    right: 50,
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
    color: myColors.secondaryColor,
  },
  subTitleText: {
    fontFamily: myFontFamilies.regular,
    marginTop: 4,
    marginBottom: 32,
    fontSize: myFontSizes.small,
    textAlign: "center",
    color: myColors.darkGrayColor,
  },
  pinInput: {
    fontSize: myFontSizes.large,
    marginBottom: 32,
    borderRadius: 4,
    backgroundColor: myColors.lightGrayColor,
    padding: 12,
    fontFamily: myFontFamilies.bold,
    textAlign: "center",
    width: "70%",
    color: myColors.primaryColor,
    letterSpacing: 2,
  },
});
