import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  View,
  TextInput,
} from "react-native";
import colours from "../../../theme/colours";
import React from "react";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.image}
        source={require("../../../images/SportsHubLogo.png")}
      />
      <View>
        <TextInput style={styles.textInput} placeholder="Email"/>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.backgroundDark,
    width: "100%",
  },
  textInput: {
    width: 200,
    backgroundColor: colours.text,
  }
});
