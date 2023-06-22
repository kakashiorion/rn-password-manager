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
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: myColors.secondaryColor,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: myColors.backgroundColor,
    fontSize: myFontSizes.large,
    fontFamily: myFontFamilies.bold,
  },
});
