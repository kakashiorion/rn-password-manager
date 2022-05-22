import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import {
  IconRevertDuration,
  myColors,
  myFontFamilies,
  myFontSizes,
} from "../../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { findIcon } from "../../utils/methods";

interface AccountListItemProps {
  accountName: string;
  accountUserName: string;
  accountPassword: string;
}
export function AccountListItem(props: AccountListItemProps) {
  const [iconName, setIconName] = useState("copy" as any);
  const [iconColor, setIconColor] = useState(myColors.lightColor);

  return (
    <View style={styles.accountListItemContainer}>
      <Ionicons
        name={(findIcon(props.accountName) as any) ?? "at-circle-outline"}
        size={32}
        style={styles.accountIcon}
      />
      <View style={styles.accountInfoContainer}>
        <Text style={styles.accountNameText}>{props.accountName}</Text>
        {props.accountUserName ? (
          <Text style={styles.accountUserNameText}>
            {props.accountUserName}
          </Text>
        ) : (
          <></>
        )}
        <Text style={styles.passwordText}>
          {Array(props.accountPassword.length).fill("*")}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.copyButtonContainer,
          {
            backgroundColor:
              iconName == "copy" ? myColors.darkGrayColor : myColors.lightColor,
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
          await Clipboard.setStringAsync(props.accountPassword);
          //Change to checkmark icon when clicked
          setIconName("checkmark-outline");
          setIconColor(myColors.primaryColor);
          ToastAndroid.show("Copied!", IconRevertDuration);
          //Change back to copy icon after 2 seconds
          setTimeout(() => {
            setIconName("copy");
            setIconColor(myColors.lightColor);
          }, IconRevertDuration);
        }}
      >
        <Ionicons
          name={iconName ?? "copy"}
          size={20}
          style={{ color: iconColor }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  accountListItemContainer: {
    borderRadius: 8,
    marginVertical: 4,
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
    marginHorizontal: 4,
  },
  accountNameText: {
    fontSize: myFontSizes.regular,
    fontFamily: myFontFamilies.bold,
    color: myColors.primaryColor,
  },
  accountUserNameText: {
    fontSize: myFontSizes.small,
    fontFamily: myFontFamilies.regular,
    color: myColors.darkColor,
  },
  passwordText: {
    fontSize: myFontSizes.small,
    fontFamily: myFontFamilies.regular,
    color: myColors.darkColor,
  },
  copyButtonContainer: {
    height: 40,
    width: 40,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 2,
    shadowColor: myColors.darkGrayColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
  },
});
