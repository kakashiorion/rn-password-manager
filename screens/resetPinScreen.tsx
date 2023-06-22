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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

const bgImageUrl = "mainBackgroundImage.jpg";
const logoUrl = "PMLogo.png";

export default function ResetPinScreen({
  navigation,
}:{
  navigation:NativeStackScreenProps<RootStackParamList, 'ResetPin'>['navigation']
}) {
  
  const route = useRoute<NativeStackScreenProps<RootStackParamList, 'ResetPin'>['route']>()
  const [codeTextValue, setCodeTextValue] = useState("");
  const handleInput = async (value: string) => {
    setCodeTextValue(value);
    if (value.length > 5) {
      // If Code matches, navigate to Set PIN Screen
      if (value==route.params.code) {
        navigation.replace("SetPin", {
          username: route.params.username,
          email: route.params.email,
        });
      } else {
        //If Code does not match, show alert
        Alert.alert("Incorrect Code.. Please try again!");
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
            We have sent a special 6-digit code to your email address: {route.params.email}
          </Text>
          <Text style={styles.headerText}>Enter the code below!</Text>
          <TextInput
            style={styles.codeInput}
            placeholder="000000"
            placeholderTextColor={myColors.tintSecondaryColor}
            keyboardType="numeric"
            value={codeTextValue}
            onChangeText={handleInput}
            textAlign="center"
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
    marginBottom: 8,
    fontSize: myFontSizes.small,
    textAlign: "center",
    color: myColors.tintTextColor,
  },
  headerText: {
    fontSize: myFontSizes.large,
    textAlign: "center",
    marginTop: 16,
    fontFamily: myFontFamilies.bold,
    color:myColors.textColor,
  },
  codeInput: {
    fontSize: myFontSizes.xl,
    padding: 12,
    marginVertical: 16,
    letterSpacing: 8,
    backgroundColor: myColors.tintBackgroundColor,
    fontFamily: myFontFamilies.bold,
    textAlign: "center",
    width: 192,
    color: myColors.textColor,
  },
});
