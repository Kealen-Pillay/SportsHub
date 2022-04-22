import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colours from "../../../theme/colours";

const ProfileScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.backgroundDark,
    width: "100%",
  },
  buttonContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
  },
  signOutButton: {
      backgroundColor: colours.pink,
      height: 50,
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
