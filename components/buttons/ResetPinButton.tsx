import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";

interface ResetPinButtonProps {
  onClick: () => void;
}
export function ResetPinButton(props: ResetPinButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClick}>
      <Text style={styles.buttonText}>Reset PIN</Text>
    </TouchableOpacity>
  );
}

export function GetCodeButton(props: ResetPinButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClick}>
      <Text style={styles.buttonText}>Get Code</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: myColors.tertiaryColor,
  },
  buttonText: {
    color: myColors.darkColor,
    fontSize: myFontSizes.large,
    fontFamily: myFontFamilies.bold,
  },
});
