import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import colours from "../../../theme/colours";

const FeedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>FeedScreen</Text>
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.lightGrey,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 50,
  },
});
