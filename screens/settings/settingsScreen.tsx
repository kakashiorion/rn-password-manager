import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { myColors, myFontFamilies, myFontSizes } from "../../styles/global";
import { getLocalData, openImagePickerAsync } from "../../utils/methods";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const [deviceUser, setDeviceUser] = useState({
    username: "",
    email: "",
    pin: "",
  });
  const [deviceSettings, setDeviceSettings] = useState({
    fingerprint: false,
    imageURL: "../../assets/avatar.jpg",
  });

  function toggleFingerprint(t: boolean) {
    const newSettings = {
      fingerprint: t,
      imageURL: deviceSettings.imageURL,
    };
    setDeviceSettings(newSettings);
    AsyncStorage.setItem("settings", JSON.stringify(newSettings));
  }

  useEffect(() => {
    (async () => {
      await getLocalData("user").then((data) => {
        if (data) {
          setDeviceUser(JSON.parse(data));
        }
      });
      await getLocalData("settings").then((data) => {
        if (data) {
          setDeviceSettings(JSON.parse(data));
        }
      });
    })();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* Profile Image */}
      <TouchableOpacity
        onPress={async () => {
          //Open Image Picker
          await openImagePickerAsync().then((data) => {
            if (data && !data.cancelled) {
              const newSettings = {
                fingerprint: deviceSettings.fingerprint,
                imageURL: data.uri,
              };
              setDeviceSettings(newSettings);
              AsyncStorage.setItem("settings", JSON.stringify(newSettings));
            }
          });
        }}
      >
        <Image
          source={{
            uri: deviceSettings.imageURL,
          }}
          style={styles.profileImage}
        ></Image>
      </TouchableOpacity>
      {/* User Name */}
      <Text style={styles.usernameText}>{deviceUser.username}</Text>
      {/* Email */}
      <Text style={styles.emailText}>{deviceUser.email}</Text>
      {/* Settings Container */}
      <View style={styles.settingsMainContainer}>
        <Text style={styles.settingsTitleText}>Settings</Text>
        {/* Fingerprint settings */}
        <View style={styles.settingContainer}>
          <View style={styles.settingIconContainer}>
            <Ionicons
              name="finger-print-outline"
              size={40}
              style={styles.settingIcon}
            />
          </View>
          <Text style={styles.settingText}>Fingerprint Scan</Text>
          <Switch
            trackColor={{
              false: myColors.darkGrayColor,
              true: myColors.primaryColor,
            }}
            thumbColor={myColors.lightColor}
            ios_backgroundColor={myColors.lightGrayColor}
            onValueChange={(t) => toggleFingerprint(t)}
            value={deviceSettings.fingerprint}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: myColors.lightColor,
    paddingTop: Platform.OS === "ios" ? 64 : 48,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  profileImage: {
    resizeMode: "cover",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: myColors.darkColor,
  },
  usernameText: {
    fontFamily: myFontFamilies.bold,
    color: myColors.darkColor,
    fontSize: myFontSizes.large,
    marginTop: 8,
  },
  emailText: {
    fontFamily: myFontFamilies.regular,
    color: myColors.darkColor,
    fontSize: myFontSizes.regular,
    marginBottom: 8,
  },
  settingsMainContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 16,
    marginHorizontal: 16,
    flex: 1,
    width: "100%",
  },
  settingsTitleText: {
    fontFamily: myFontFamilies.bold,
    color: myColors.darkGrayColor,
    fontSize: myFontSizes.large,
    marginVertical: 8,
  },
  settingContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: myColors.lightGrayColor,
    borderRadius: 8,
  },
  settingIconContainer: {
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    margin: 8,
    // backgroundColor: myColors.pureWhiteColor,
    opacity: 0.8,
  },
  settingText: {
    fontFamily: myFontFamilies.bold,
    color: myColors.darkColor,
    fontSize: myFontSizes.regular,
    marginVertical: 8,
    flex: 1,
  },
  settingIcon: {
    color: myColors.primaryColor,
  },
});
