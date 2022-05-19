import { StyleSheet, Image, Text } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { myColors, myFontFamilies, myFontSizes } from "../styles/global";

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  return (
    <Onboarding
      imageContainerStyles={styles.container}
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
            "No need to keep a notebook to remember your personal data anymore",
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
            "Get started with easy signup or biometric login within seconds",
        },
      ]}
      onDone={() => navigation.navigate("Signup")}
      onSkip={() => navigation.navigate("Signup")}
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
  container: {},
  onboardingImage: {
    height: 256,
    resizeMode: "contain",
  },
  startText: {
    color: myColors.secondaryColor,
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    marginRight: 24,
  },
  titleText: {
    fontSize: myFontSizes.xl,
    fontFamily: myFontFamilies.bold,
  },
  subText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.regular,
  },
});
