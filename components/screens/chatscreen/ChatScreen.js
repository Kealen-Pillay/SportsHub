import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { darkTheme, lightTheme } from "../../../theme/themes";
import React from "react";
import NavGradient from "../../NavGradient";

const ChatScreen = ({ darkModeEnabled }) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: darkModeEnabled
            ? darkTheme.background
            : lightTheme.background,
        },
      ]}
    >
      <NavGradient />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
