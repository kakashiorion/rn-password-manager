import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SignupButton from "../components/buttons/SignupButton";
import { RootStackParamList, myColors, myFontFamilies, myFontSizes } from "../styles/global";
import { createUserWithEmail } from "../utils/methods";
import emailJS from "@emailjs/browser";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {useNetInfo} from "@react-native-community/netinfo";

const bgImageUrl = "mainBackgroundImage.jpg";
const logoUrl = "PMLogo.png";

export default function SignupScreen({navigation}:{navigation:NativeStackScreenProps<RootStackParamList, 'Signup'>['navigation']}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const netInfo = useNetInfo()
  
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
            onClick={async () => {
              if (netInfo.isConnected) {
                //Generate a code
                const code = Math.floor(100000 + Math.random() * 900000);
                //Create a new user with this email, username and code
                await createUserWithEmail(email,username,code.toString());
                //Send signup email to the user
                emailJS.send(
                  "service_s4q446u",
                  "template_s7obdqb",
                  {
                    email: email,
                    name: username,
                    code: code.toString(),
                  },
                  "9_66Gz36slYB-nUQo"
                );
                //Go to verification screen
                navigation.push("ResetPin", {
                  username: username,
                  email: email,
                  code: code.toString()
                });
              } else {
                //No internet
                Alert.alert("You are not connected to the internet")
              }
            }
            }
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
    paddingVertical: 128,
  },
  mainContainer: {
    width: "100%",
    height:"100%",
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
  upperLeftCircle: {
    backgroundColor: myColors.secondaryColor,
    opacity: 0.8,
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
    top: -120,
    left: -80,
  },
  lowerRightCircle: {
    backgroundColor: myColors.secondaryColor,
    opacity: 0.8,
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    bottom: -70,
    right: 20,
  },
  logoImage: {
    width: "100%",
    height: "15%",
    resizeMode: "contain",
  },
  titleText: {
    fontFamily: myFontFamilies.bold,
    marginTop: 8,
    fontSize: myFontSizes.xl,
    textAlign: "center",
    color: myColors.textColor,
  },
  subTitleText: {
    fontFamily: myFontFamilies.regular,
    marginTop: 4,
    marginBottom: 32,
    fontSize: myFontSizes.small,
    textAlign: "center",
    color: myColors.tintTextColor,
  },
  usernameInput: {
    fontSize: myFontSizes.regular,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: myColors.tintBackgroundColor,
    padding: 12,
    fontFamily: myFontFamilies.regular,
    textAlign: "center",
    width: "90%",
    color: myColors.secondaryColor,
  },
});
