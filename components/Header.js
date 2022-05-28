import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
  return (
    <SafeAreaView>
      <View style={styles.background}>
        <Text style={styles.text}>Posts</Text>
      </View>
    </SafeAreaView>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#7C9473",
    padding: 10,
  },
  text: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});
