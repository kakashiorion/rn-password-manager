import { StyleSheet, Image, Text } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { RootStackParamList, myColors, myFontFamilies, myFontSizes } from "../styles/global";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export default function OnboardingScreen({ navigation }: { navigation: NativeStackScreenProps<RootStackParamList, 'Onboarding'>['navigation']
}) {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "lightgreen",
          image: (
            <Image
              source={require("../assets/security.png")}
              style={styles.onboardingImage}
            />
          ),
          title: "Save your passwords",
          subtitle:
            "Store all your sensitive data like passwords and card details securely on the cloud",
        },
        {
          backgroundColor: "plum",
          image: (
            <Image
              source={require("../assets/forgot.png")}
              style={styles.onboardingImage}
            />
          ),
          title: "Retrieve on any device",
          subtitle:
            "No need to keep a notebook anymore.. Get your data anytime anywhere",
        },
        {
          backgroundColor: "skyblue",
          image: (
            <Image
              source={require("../assets/fingerprint.png")}
              style={styles.onboardingImage}
            />
          ),
          title: "Simple and quick",
          subtitle:
            "Get started with easy PIN or biometric login within seconds",
        },
      ]}
      onDone={() => navigation.replace("Signup")}
      onSkip={() => navigation.replace("Signup")}
      DoneButtonComponent={Done}
      transitionAnimationDuration={200}
      titleStyles={styles.titleText}
      subTitleStyles={styles.subText}
    />
  );
}

const Done = ({ ...props }) => (
  <Text style={styles.startText} {...props}>
    START
  </Text>
);

const styles = StyleSheet.create({
  onboardingImage: {
    height: 256,
    resizeMode: "contain",
  },
  startText: {
    color: myColors.textColor,
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    marginRight: 24,
  },
  titleText: {
    color: myColors.textColor,
    fontSize: myFontSizes.xl,
    fontFamily: myFontFamilies.bold,
  },
  subText: {
    color:myColors.tintTextColor,
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.regular,
  },
});
