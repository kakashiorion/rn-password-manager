import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";

interface SignupButtonProps {
  onClick: () => void;
}
export default function SignupButton(props: SignupButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClick}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: myColors.primaryColor,
  },
  buttonText: {
    color: myColors.whiteColor,
    fontSize: myFontSizes.large,
    fontFamily: myFontFamilies.bold,
  },
});
