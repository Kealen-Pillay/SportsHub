import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colours from "../../../theme/colours";
import { Card, Switch, Chip } from "react-native-paper";
import SelectableChips from "react-native-chip/SelectableChips";
import { useState } from "react";

const ProfileScreen = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.usernameCardContainer}>
        <Card style={styles.usernameCard}>
          <Text style={styles.usernameText}>USERNAME</Text>
          <View style={styles.chipContainer}>
            <SelectableChips
              initialChips={["BASKETBALL", "FOOTBALL", "VOLLEYBALL"]}
              chipStyle={{
                backgroundColor: colours.lightGrey,
                borderColor: "black",
                borderWidth: 1,
                width: 290,
                height: 30,
              }}
              valueStyle={{ color: "white", fontSize: 15, fontWeight: 'bold' }}
              chipStyleSelected={{
                backgroundColor: colours.pink,
              }}
            />
          </View>
        </Card>
      </View>
      <View style={styles.ratingCardContainer}>
        <Card style={styles.ratingCard}>
          <Card.Content>
            <Text style={styles.ratingText}>Rating:</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.darkModeCardContainer}>
        <Card style={styles.darkModeCard}>
          <Card.Content>
            <Text style={styles.darkModeText}>Dark Mode:</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={() => setIsSwitchOn(!isSwitchOn)}
              style={styles.switch}
            />
          </Card.Content>
        </Card>
      </View>
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
    justifyContent: "flex-start",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  usernameCardContainer: {
    height: 200,
    width: "90%",
    marginBottom: 20,
    marginTop: 80,
  },
  usernameCard: {
    backgroundColor: colours.lightGrey,
    borderColor: colours.pink,
    borderWidth: 2,
    borderRadius: 15,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  usernameText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 20,
  },
  chipContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "90%",
  },
  ratingCard: {
    backgroundColor: colours.lightGrey,
    borderColor: colours.pink,
    borderWidth: 2,
    borderRadius: 15,
    height: 80,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ratingCardContainer: {
    height: 80,
    width: "90%",
    marginBottom: 20,
  },
  darkModeCardContainer: {
    height: 80,
    width: "90%",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  darkModeCard: {
    backgroundColor: colours.lightGrey,
    borderColor: colours.pink,
    borderWidth: 2,
    borderRadius: 15,
    height: 80,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  darkModeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 5,
  },
  ratingText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 5,
  },
});
