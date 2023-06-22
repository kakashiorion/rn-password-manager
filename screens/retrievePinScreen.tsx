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
import { RootStackParamList, myColors, myFontFamilies, myFontSizes } from "../styles/global";
import { GetCodeButton } from "../components/buttons/ResetPinButton";
import { getUserData, updateCode } from "../utils/methods";
import emailJS from "@emailjs/browser";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";

const bgImageUrl = "mainBackgroundImage.jpg";
const logoUrl = "PMLogo.png";

export default function RetrievePinScreen({
  navigation,
}:{
  navigation:NativeStackScreenProps<RootStackParamList, 'RetrievePin'>['navigation']
}) {

  const route = useRoute<NativeStackScreenProps<RootStackParamList, 'RetrievePin'>['route']>()
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
          <Text style={styles.titleText}>Hi {route.params.username}!</Text>
          <Text style={styles.subTitleText}>
            Looks like you forgot your PIN. Don't worry.. We will send a reset code to
            your email.
          </Text>
          <TextInput
            style={styles.usernameInput}
            placeholder="Enter your Email"
            placeholderTextColor={myColors.tintSecondaryColor}
            value={email}
            onChangeText={(t: string) => setEmail(t)}
          />
          <GetCodeButton
            onClick={async () => {
              if (netInfo.isConnected){
                //Check if email is registered
                const val = await getUserData(email);
                if (val.exists()) {
                  //Generate a new code and update in FireDB
                  const code = Math.floor(100000 + Math.random() * 900000);
                  await updateCode(email,code.toString());
                  //If yes, navigate to reset pin screen
                  navigation.push("ResetPin", {
                    username: route.params.username,
                    email: email,
                    code:code.toString()
                  });
                  //Email code to the user
                  emailJS.send(
                    "service_tnhdkjl",
                    "template_x865tpo",
                    {
                      email: email,
                      name: route.params.username,
                      code: code.toString(),
                    },
                    "IufKPtYnPInbXK1wa"
                  );
                } else {
                  //Unregistered email
                  Alert.alert("No such email is registered!");
                }
              } else {
                //No internet
                Alert.alert("You are not connected to the internet")
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
    color: myColors.textColor,
  },
  subTitleText: {
    fontFamily: myFontFamilies.regular,
    marginTop: 4,
    marginBottom: 16,
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
    color: myColors.textColor,
  },
});
