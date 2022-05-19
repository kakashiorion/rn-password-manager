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
import { GetCodeButton } from "../components/buttons/ResetPinButton";
import { generateCode, getUserData } from "../utils/methods";
import { RouteProp } from "@react-navigation/native";

const bgImageUrl = "mainBackgroundImage.jpg";
const logoUrl = "PMLogo.png";

export default function RetrievePinScreen({
  route,
  navigation,
}: {
  route: RouteProp<{ params: { user: string; email: string } }, "params">;
  navigation: any;
}) {
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
          <Text style={styles.titleText}>Hi {route.params.user}!</Text>
          <Text style={styles.subTitleText}>
            Looks like you forgot your PIN. We will send a code to your email.
          </Text>
          <TextInput
            style={styles.usernameInput}
            placeholder="Enter your Email"
            value={email}
            onChangeText={(t: string) => setEmail(t)}
          />
          <GetCodeButton
            onClick={async () => {
              //Check if email is registered
              const val = await getUserData(email);
              if (val.exists()) {
                //If yes, navigate to reset pin screen
                navigation.navigate("ResetPin", {
                  user: route.params.user,
                  email: email,
                });
                //Meanwhile, generate a new code in FireDB for this user
                generateCode(email);
                //TODO:Email code to the user
              } else {
                //If no, show unregistered error
                Alert.alert("No such email is registered!");
              }
            }}
          />

          <Text
            style={styles.rememberText}
            onPress={() => {
              navigation.goBack();
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
});
