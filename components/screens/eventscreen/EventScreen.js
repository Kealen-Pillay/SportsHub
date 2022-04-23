import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import colours from "../../../theme/colours";
import NavGradient from "../../NavGradient";

const EventScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>EventScreen</Text>
      <NavGradient/>
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.backgroundDark,
    flex:1,
    justifyContent: "center",
    alignItems: "center",

  },
  text: {
    color: "white",
    fontSize: 50,
  },
});
