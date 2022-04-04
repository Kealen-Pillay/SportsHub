import { StyleSheet, KeyboardAvoidingView, Image } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView>
      <Image style={styles.image} source={require("../../../images/SportsHubLogo.png")} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    image: {
    }
});
