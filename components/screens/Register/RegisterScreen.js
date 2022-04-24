import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth } from "../../../firebase";
import { firestore } from "../../../firestore";
import { useNavigation } from "../../../node_modules/@react-navigation/core";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [rating, setRating] = useState("");
  const [profileimg, setProfileimg] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    //username checks
    if (username.length < 3) {
      alert("Username must be at least 3 characters");
    }
    // email checks
    else if (email.length == 0) {
      alert("Please enter an email");
    } else if (!email.match(/\w+@[A-Za-z_]+\.[A-Za-z]{2,6}/)) {
      alert("Please enter an email of the format: example@gmail.com");
    }
    //password checks
    else if (password.length < 6) {
      alert("Password must be at least 6 characters");
    } else if (password != confpassword) {
      alert("Passwords do not match! Please try again.");
    }
    //all fields are fine, create the account
    else {
      addUser()
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user.email);
        })
        .catch((error) => alert(error.message));
    }
  };


  const addUser = () => {
    firestore
      .collection("users")
      .add({
        username: username,
        email: email,
        rating: 3,
        profileimg: "test",
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        // showMessage({
        //   message: "User added!",
        //   type: "success",
        //   hideStatusBar: true,
        // });
      })
      // .then(() => {
      //   navigation.navigate("TempEvent");
      // })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        // showMessage({
        //   message: "ERROR adding user",
        //   type: "danger",
        //   hideStatusBar: true,
        // });
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/SportsHubLogo.png")}
      />
      <View>
        <TextInput
          style={styles.text}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.text}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.text}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.text}
          placeholder="Confirm Password"
          value={confpassword}
          onChangeText={(text) => setConfpassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          testID="registerButton"
          style={styles.button}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    width: 300,
    height: 50,
    paddingLeft: 10,
    margin: 15,
  },
  logo: {
    marginBottom: 30,
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: "#E82A96",
    width: "50%",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
