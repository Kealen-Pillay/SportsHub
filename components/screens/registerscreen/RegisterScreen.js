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
import { auth } from "../../../firebase/firebase";
import { firestore } from "../../../firebase/firestore";
import { useNavigation } from "../../../node_modules/@react-navigation/core";
import { Rating } from "react-native-ratings";



const RegisterScreen = () => {

  const RatingBox = () => {
    return (
      <View style={styles.ratingsContainer}>
        <Text style={styles.abilityText}>Ability:</Text>
        <Rating
          type="custom"
          minValue={1}
          startingValue={0}
          onFinishRating={(rating) => setRating(rating)}
          ratingBackgroundColor={"black"}
          readonly={false}
          tintColor={"white"}
          style={styles.rating}
        />
      </View>
    );
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [rating, setRating] = useState("");


  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Dashboard");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (username.length < 3) {
      alert("Username must be at least 3 characters");
    } else if (username.length > 10) {
      alert("Username must be 10 or less characters");
    } else if (email.length == 0) {
      alert("Please enter an email");
    } else if (!email.match(/\w+@[A-Za-z_]+\.[A-Za-z]{2,6}/)) {
      alert("Please enter an email of the format: example@gmail.com");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters");
    } else if (password != confpassword) {
      alert("Passwords do not match! Please try again.");
    } else if (rating == 0) {
      alert("Please select a rating!")
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

  const handleReturn = () => {
    navigation.navigate("Login");
  }

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
      })
      .catch(function (error) {
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../images/SportsHubLogo.png")}
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
        <TouchableOpacity style={styles.returnButton} onPress={handleReturn}>
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
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    alignItems: "flex-start",
    marginRight: 10,
    marginTop: 10,
    marginLeft: 3,
  },
  ratingsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "80%",
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
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
  rating: {
    marginTop: 5,
  }
});