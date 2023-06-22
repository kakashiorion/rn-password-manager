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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

const bgImageUrl = "mainBackgroundImage.jpg";
const logoUrl = "PMLogo.png";

export default function SetPinScreen({
  navigation,
}:{
  navigation:NativeStackScreenProps<RootStackParamList, 'SetPin'>['navigation']
}) {

  const route = useRoute<NativeStackScreenProps<RootStackParamList, 'SetPin'>['route']>()
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
            Let's set a 4-digit pin which you can use to login!
          </Text>
          <TextInput
            style={styles.pinInput}
            placeholder="Set PIN"
            placeholderTextColor={myColors.tintSecondaryColor}
            value={firstPin}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={(t: string) => setFirstPin(t)}
          />
          <TextInput
            style={styles.pinInput}
            placeholder="Confirm PIN"
            placeholderTextColor={myColors.tintSecondaryColor}
            value={confirmPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry={true}
            onChangeText={(t: string) => {
              setConfirmPin(t);
              if (t.length > 3) {
                if (t == firstPin) {
                  //PINs matched.. update in local storage
                  AsyncStorage.setItem(
                    "user",
                    JSON.stringify({
                      username: route.params.username,
                      email: route.params.email,
                      pin: t,
                    })
                  );
                  navigation.replace("Home");
                } else {
                  //PINs do not match
                  Alert.alert("PINs do not match.. Please try again");
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
  pinInput: {
    fontSize: myFontSizes.large,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: myColors.tintBackgroundColor,
    padding: 12,
    fontFamily: myFontFamilies.bold,
    textAlign: "center",
    width: "70%",
    color: myColors.textColor,
    letterSpacing: 2,
  },
});
