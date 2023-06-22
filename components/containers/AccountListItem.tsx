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
  const [iconColor, setIconColor] = useState(myColors.backgroundColor);
  const [hidePwd, setHidePwd] = useState(true);

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
          {hidePwd?Array(props.accountPassword.length).fill("*"):props.accountPassword}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.hideButtonContainer,{
            backgroundColor: hidePwd? myColors.textColor:myColors.backgroundColor,
          }
        ]}
        onPress={ () => {
          setHidePwd(!hidePwd)
        }}
      >
        <Ionicons
          name={hidePwd?"eye":"eye-off"}
          size={20}
          style={{ color: hidePwd?myColors.backgroundColor:myColors.textColor }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.copyButtonContainer,
        ]}
        onPress={async () => {
          await Clipboard.setStringAsync(props.accountPassword);
          //Change to checkmark icon when clicked
          setIconName("checkmark-outline");
          setIconColor(myColors.shadePrimaryColor);
          ToastAndroid.show("Copied!", IconRevertDuration);
          //Change back to copy icon after 2 seconds
          setTimeout(() => {
            setIconName("copy");
            setIconColor(myColors.backgroundColor);
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
    marginVertical:4,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor:myColors.backgroundColor,
    shadowRadius: 2,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  accountIcon: {
    margin: 8,
    color:myColors.textColor
  },
  accountInfoContainer: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    flex: 1,
    marginHorizontal: 4,
  },
  accountNameText: {
    fontSize: myFontSizes.large,
    fontFamily: myFontFamilies.bold,
    color: myColors.tintPrimaryColor,
  },
  accountUserNameText: {
    fontSize: myFontSizes.small,
    fontFamily: myFontFamilies.regular,
    color: myColors.textColor,
    marginVertical:4,
  },
  passwordText: {
    fontSize: myFontSizes.small,
    fontFamily: myFontFamilies.regular,
    color: myColors.tintTextColor,
  },
  copyButtonContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:myColors.textColor,
    shadowRadius: 2,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  hideButtonContainer:{
    height: 40,
    width: 40,
    marginHorizontal:8,
    borderRadius: 20,
    borderWidth:2,
    borderColor:myColors.textColor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:myColors.textColor,
    shadowRadius: 2,
    shadowColor: myColors.tintBackgroundColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  }
});
