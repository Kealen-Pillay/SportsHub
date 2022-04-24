import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import colours from "../../../theme/colours";
import NavGradient from "../../NavGradient";

const FeedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>FeedScreen</Text>
      <NavGradient />
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.backgroundDark,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 50,
  },
});
