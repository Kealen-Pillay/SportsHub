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
        <TextInput style={styles.textInput} placeholder="Email" />
        <TextInput style={styles.textInput} placeholder="Password" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.buttonText}>
            Register
          </Text>
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
    marginBottom: 30,
    marginTop: 70,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.backgroundDark,
    width: "100%",
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
  },
  textInput: {
    marginTop: 20,
    height: 50,
    backgroundColor: colours.text,
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    marginTop: 50,
    marginBottom: 100,
  },
  loginButton: {
    backgroundColor: colours.purple,
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: colours.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: colours.pink,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "70%",
    borderRadius: 5,
  },
  text: {
    color: colours.text,
    margin: 20,
    fontWeight: "bold",
  }
});
