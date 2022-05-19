import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";

interface SignupButtonProps {
  onClick: () => void;
}

export function SignupButtonWithGoogle(props: SignupButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClick}>
      <Ionicons name="logo-google" size={20} style={styles.logo} />
      <Text style={styles.buttonText}>Register with Google</Text>
    </TouchableOpacity>
  );
}

export function SignupButtonWithFacebook(props: SignupButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClick}>
      <Ionicons name="logo-facebook" size={20} style={styles.logo} />
      <Text style={styles.buttonText}>Register with Facebook</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: myColors.primaryColor,
    borderWidth: 2,
    margin: 8,
  },
  buttonText: {
    color: myColors.primaryColor,
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.regular,
  },
  logo: {
    marginRight: 16,
    color: myColors.secondaryColor,
  },
});
