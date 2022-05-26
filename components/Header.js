import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.background}>
      <Text style={styles.text}>Posts</Text>
    </View>
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
