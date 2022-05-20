import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { findIcon } from "../../utils/methods";

const IconRevertDuration = 2000;

interface AccountListItemProps {
  accountName: string;
  password: string;
}
export function AccountListItem(props: AccountListItemProps) {
  const [iconName, setIconName] = useState("copy" as any);
  const [iconColor, setIconColor] = useState(myColors.whiteColor);

  return (
    <TouchableOpacity style={styles.accountListItemContainer}>
      <Ionicons
        name={(findIcon(props.accountName) as any) ?? "at-circle-outline"}
        size={32}
        style={styles.accountIcon}
      />
      <View style={styles.accountInfoContainer}>
        <Text style={styles.accountNameText}>{props.accountName}</Text>
        <Text style={styles.passwordText}>
          {Array(props.password.length).fill("*")}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.copyButtonContainer,
          {
            backgroundColor:
              iconName == "copy" ? myColors.darkGrayColor : myColors.whiteColor,
            borderColor:
              iconName == "copy"
                ? myColors.darkGrayColor
                : myColors.primaryColor,
            shadowColor:
              iconName == "copy"
                ? myColors.darkGrayColor
                : myColors.primaryColor,
          },
        ]}
        onPress={async () => {
          await Clipboard.setStringAsync(props.password);
          //Change to checkmark icon when clicked
          setIconName("checkmark-outline");
          setIconColor(myColors.primaryColor);
          ToastAndroid.show("Copied password!", IconRevertDuration);
          //Change back to copy icon after 2 seconds
          setTimeout(() => {
            setIconName("copy");
            setIconColor(myColors.whiteColor);
          }, IconRevertDuration);
        }}
      >
        <Ionicons
          name={iconName ?? "copy"}
          size={20}
          style={{ color: iconColor }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  accountListItemContainer: {
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: myColors.lightGrayColor,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  accountIcon: {
    margin: 8,
  },
  accountInfoContainer: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    flex: 1,
    margin: 4,
  },
  accountNameText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    color: myColors.primaryColor,
  },
  passwordText: {
    fontSize: myFontSizes.small,
    fontFamily: myFontFamilies.regular,
    color: myColors.secondaryColor,
  },
  copyButtonContainer: {
    height: 40,
    width: 40,
    borderWidth: 1,
    // backgroundColor: myColors.darkGrayColor,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 1,
    shadowColor: myColors.darkGrayColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 1,
  },
});
