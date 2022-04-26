import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { darkTheme, lightTheme } from "../../../theme/themes";
import { Card, Switch } from "react-native-paper";
import { useState, useEffect } from "react";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase/firebase";
import UploadImage from "./UploadImage";
import NavGradient from "../../NavGradient";

export var darkMode = true;

const ProfileScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (isEnabled) {
      darkMode = true;
    } else {
      darkMode = false;
    }
  }, [isEnabled]);

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: isEnabled ? darkTheme.background : "#ffffff" },
      ]}
    >
      <View style={styles.usernameCardContainer}>
        <Card
          style={[
            styles.usernameCard,
            {
              backgroundColor: isEnabled
                ? darkTheme.cardBackground
                : lightTheme.cardBackground,
              borderColor: isEnabled ? darkTheme.pink : lightTheme.pink,
            },
          ]}
        >
          <UploadImage darkModeEnabled={isEnabled} />
          <Text style={styles.usernameText}>
            {auth.currentUser?.email.split("@")[0]}
          </Text>
        </Card>
      </View>
      <View style={styles.ratingCardContainer}>
        <Card
          style={[
            styles.ratingCard,
            {
              backgroundColor: isEnabled
                ? darkTheme.cardBackground
                : lightTheme.cardBackground,
              borderColor: isEnabled ? darkTheme.pink : lightTheme.pink,
            },
          ]}
        >
          <View style={styles.ratingsInnerContainer}>
            <Text
              style={[
                styles.ratingText,
                { color: isEnabled ? darkTheme.text : lightTheme.text },
              ]}
            >
              Rating:
            </Text>
            <Rating
              type="custom"
              onFinishRating={ratingCompleted}
              ratingBackgroundColor={"black"}
              readonly={true}
              tintColor={
                isEnabled ? darkTheme.cardBackground : lightTheme.cardBackground
              }
            />
          </View>
        </Card>
      </View>
      <View style={styles.darkModeCardContainer}>
        <Card
          style={[
            styles.darkModeCard,
            {
              backgroundColor: isEnabled
                ? darkTheme.cardBackground
                : lightTheme.cardBackground,
              borderColor: isEnabled ? darkTheme.pink : lightTheme.pink,
            },
          ]}
        >
          <View style={styles.darkModeInnerContainer}>
            <Text
              style={[
                styles.darkModeText,
                { color: isEnabled ? darkTheme.text : lightTheme.text },
              ]}
            >
              Dark Mode:
            </Text>
            <Switch
              value={isEnabled}
              onValueChange={() => setIsEnabled(!isEnabled)}
              style={styles.switch}
            />
          </View>
        </Card>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <NavGradient />
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButton: {
    backgroundColor: darkTheme.pink,
    height: 60,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 30,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  usernameCardContainer: {
    height: 200,
    width: "90%",
    marginBottom: 30,
    marginTop: 80,
  },
  usernameCard: {
    borderWidth: 2,
    borderRadius: 15,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  usernameText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 10,
  },
  ratingCard: {
    borderWidth: 2,
    borderRadius: 15,
    height: 80,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ratingCardContainer: {
    height: 80,
    width: "90%",
    marginBottom: 30,
  },
  darkModeCardContainer: {
    height: 80,
    width: "90%",
    marginBottom: 50,
  },
  darkModeCard: {
    borderWidth: 2,
    borderRadius: 15,
    height: 80,
    alignItems: "flex-start",
  },
  darkModeText: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 10,
    marginRight: 130,
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 35,
  },
  darkModeInnerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingsInnerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
