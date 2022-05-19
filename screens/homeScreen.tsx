import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <View style={styles.homeContainer}>
        <Text style={styles.homeText}>home screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {},
});
