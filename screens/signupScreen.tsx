import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import SignupButton from "../components/buttons/SignupButton";
import { myColors, myFontFamilies, myFontSizes } from "../styles/global";
import {
  SignupButtonWithFacebook,
  SignupButtonWithGoogle,
} from "../components/buttons/SignupButtonWithIcon";

const bgImageUrl = "mainBackgroundImage.jpg";
const logoUrl = "PMLogo.png";

export default function SignupScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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
          <Text style={styles.titleText}>Register</Text>
          <Text style={styles.subTitleText}>
            You can quickly signup with an email
          </Text>
          <TextInput
            style={styles.usernameInput}
            placeholder="Enter your Email"
            value={email}
            onChangeText={(t: string) => setEmail(t)}
          />
          <TextInput
            style={styles.usernameInput}
            placeholder="Enter your Name"
            value={username}
            onChangeText={(t: string) => setUsername(t)}
          />
          <SignupButton
            onClick={() => {
              navigation.navigate("SetPin", {
                user: username,
                email: email,
              });
            }}
          />
          <Text style={styles.orText}>OR</Text>
          <SignupButtonWithGoogle onClick={() => {}} />
          <SignupButtonWithFacebook onClick={() => {}} />
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
  usernameInput: {
    fontSize: myFontSizes.regular,
    marginBottom: 32,
    borderRadius: 4,
    backgroundColor: myColors.lightGrayColor,
    padding: 12,
    fontFamily: myFontFamilies.regular,
    textAlign: "center",
    width: "90%",
    color: myColors.primaryColor,
  },
  pinInput: {
    width: "50%",
    marginBottom: 32,
  },
  orText: {
    fontSize: myFontSizes.regular,
    textAlign: "center",
    marginVertical: 24,
    fontFamily: myFontFamilies.bold,
    color: myColors.darkGrayColor,
  },
});
