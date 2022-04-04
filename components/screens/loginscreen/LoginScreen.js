import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
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
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Email"/>
        <TextInput style={styles.textInput} placeholder="Password"/>
      </View>
<View style={styles.buttonContainer}>
<TouchableOpacity>
  <Text>Login</Text>
</TouchableOpacity>
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
  inputContainer:{
    width: '80%',
  },
  textInput: {
    marginTop: 10,
    height: 40,
    backgroundColor: colours.text,
    borderRadius: 5,
    paddingLeft: 10,
  }
});
