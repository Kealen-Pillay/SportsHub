import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import NavGradient from "../../NavGradient";
import { darkTheme, lightTheme } from "../../../theme/themes";

const EventScreen = ({ darkModeEnabled }) => {
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
      <Text
        style={[
          styles.text,
          { color: darkModeEnabled ? darkTheme.text : lightTheme.text },
        ]}
      >
        EventScreen
      </Text>
      <NavGradient />
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
  },
});
