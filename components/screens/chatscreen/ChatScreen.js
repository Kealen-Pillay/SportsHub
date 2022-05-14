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
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            { color: darkModeEnabled ? darkTheme.text : lightTheme.text },
          ]}
        >
          CHATROOM
        </Text>
      </View>
      <NavGradient />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleContainer: {
    alignItems: "center",
    width: "95%",
    borderWidth: 2,
    borderColor: darkTheme.pink
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
  },
});
