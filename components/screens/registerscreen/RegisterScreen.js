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
import { showMessage } from "react-native-flash-message";


const RegisterScreen = () => {
  const starImgFilled = require("../../../images/star_filled.png");
  const starImgCorner = require("../../../images/star_corner.png");
  const [defaultRating, setdefaultRating] = useState(3);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [newUser, setNewUser] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Dashboard");
      }
    });
    return unsubscribe;
  }, []);

  const RatingBox = () => {
    return (
      <View style={styles.customRatingBar}>
        <Text style={styles.abilityText}>Skill:</Text>
        {maxRating.map((rating, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={rating}
              onPress={() => setdefaultRating(rating)}
            >
              <Image
                style={styles.starImgStyle}
                source={rating <= defaultRating ? starImgFilled : starImgCorner}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleSignUp = () => {
    if (username.length < 3) {
      showMessage({
        message: "Username must be at least 3 characters!",
        type: "danger",
        hideStatusBar: true,
      });
    } else if (username.length > 10) {
      showMessage({
        message: "Username must be 10 characters or less!",
        type: "danger",
        hideStatusBar: true,
      });
    } else if (email.length == 0) {
      showMessage({
        message: "Please enter an email!",
        type: "danger",
        hideStatusBar: true,
      });
    } else if (!email.match(/\w+@[A-Za-z_]+\.[A-Za-z]{2,6}/)) {
      showMessage({
        message: "Please enter an email of the format: example@gmail.com",
        type: "danger",
        hideStatusBar: true,
      });
    } else if (password.length < 6) {
      showMessage({
        message: "Password must be at least 6 characters!",
        type: "danger",
        hideStatusBar: true,
      });
    } else if (password != confpassword) {
      showMessage({
        message: "Passwords do not match! Please try again!",
        type: "danger",
        hideStatusBar: true,
      });
    } else if (defaultRating == 0) {
      showMessage({
        message:"Please select a rating!",
        type: "danger",
        hideStatusBar: true,
      });
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          showMessage({
            message:"Account Created",
            type: "success",
            hideStatusBar: true,
          });
        })
        .catch((error) => {
          setNewUser(false);
          alert(error.message);
        });
      if (newUser == true) addUser();
    }
  };

  const handleReturn = () => {
    navigation.navigate("Login");
  };

  const addUser = () => {
    firestore
      .collection("users")
      .add({
        username: username,
        email: email,
        rating: defaultRating,
        profileimg: "",
      })
      .then(function (docRef) {})
      .catch(function (error) {});
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
          keyboardAppearance='dark'
        />
        <TextInput
          style={styles.text}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          keyboardAppearance='dark'
        />
        <TextInput
          style={styles.text}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          keyboardAppearance='dark'
        />
        <TextInput
          style={styles.text}
          placeholder="Confirm Password"
          value={confpassword}
          onChangeText={(text) => setConfpassword(text)}
          secureTextEntry
          keyboardAppearance='dark'
        />
      </View>
      <View>
        <RatingBox />
      </View>
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
    marginLeft: 5,
  },
  customRatingBar: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "80%",
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  starImgStyle: {
    width: 35,
    height: 35,
    resizeMode: "cover",
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
