import { StyleSheet, KeyboardAvoidingView, Image, View } from "react-native";
import colours from "../../../theme/colours";
import React from "react";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>

      <Image style={styles.image} source={require("../../../images/SportsHubLogo.png")} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    image: {
      width: 50,
      height:50
    },
    container: {
      flex:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.backgroundDark,
      width:"100%",
    }
});

