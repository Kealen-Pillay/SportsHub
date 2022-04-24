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
import { Rating } from "react-native-ratings";

const RatingBox = () => {
  const [rating, setRating] = useState("");

  return (
    <View style={styles.ratingsContainer}>
      <Text style={styles.abilityText}>Ability:</Text>
      <Rating
        type="custom"
        onFinishRating={(rating) => setRating(rating)}
        ratingBackgroundColor={"black"}
        readonly={false}
        tintColor={"#1E1E1E"}
        style={styles.rating}
      />
    </View>
  );
};

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfpassword] = useState("");

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
    if (username.length < 3) {
      alert("Username must be at least 3 characters");
    } else if (email.length == 0) {
      alert("Please enter an email");
    } else if (!email.match(/\w+@[A-Za-z_]+\.[A-Za-z]{2,6}/)) {
      alert("Please enter an email of the format: example@gmail.com");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters");
    } else if (password != confpassword) {
      alert("Passwords do not match! Please try again.");
    } else {
      addUser();
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
        rating: rating,
        profileimg: "test",
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
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
      <RatingBox />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.returnContainer}>
        <TouchableOpacity style={styles.returnButton}>
          <Text style={styles.buttonText}>Return to Login Screen</Text>
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
    width: 320,
    height: 50,
    paddingLeft: 10,
    margin: 15,
  },
  logo: {
    marginBottom: 10,
    width: 150,
    height: 150,
  },
  button: {
    backgroundColor: "#E82A96",
    width: "80%",
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
  abilityText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    alignItems: "flex-start",
    marginRight: 10,
    marginTop: 2,
    marginLeft: 3,
  },
  ratingsContainer: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    width: "80%",
    marginTop: 20,
    marginBottom: 10,
  },
  returnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  returnButton: {
    backgroundColor: "#7C2AE8",
    width: "80%",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
