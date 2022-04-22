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
import { useState } from "react";

const ProfileScreen = () => {
  const [basketballChipSelected, setBasketballChipSelected] = useState(false);
  const [footballChipSelected, setFootballChipSelected] = useState(false);
  const [volleyballChipSelected, setVolleyballChipSelected] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.usernameCardContainer}>
        <Card style={styles.usernameCard}>
          <Text style={styles.usernameText}>USERNAME</Text>
          <View style={styles.chipContainer}>
            <Chip
              mode="outlined"
              selected={basketballChipSelected}
              style={styles.chip}
              onPress={() => {
                setBasketballChipSelected(!basketballChipSelected);
              }}
            >
              <Text style={styles.chipText}>Basketball</Text>
            </Chip>
            <Chip
              mode="flat"
              selected={footballChipSelected}
              style={styles.chip}
              onPress={() => {
                setFootballChipSelected(!footballChipSelected);
              }}
            >
              <Text style={styles.chipText}>Football</Text>
            </Chip>
            <Chip
              mode="outlined"
              selected={volleyballChipSelected}
              style={styles.chip}
              onPress={() => {
                setVolleyballChipSelected(!volleyballChipSelected);
              }}
            >
              <Text style={styles.chipText}>Volleyball</Text>
            </Chip>
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
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 20,
  },
  chip: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: colours.lightGrey,
    width: "80%",
    height: 50,
    marginTop: 20,
    marginRight: 5,
    flex: 1,
  },
  chipText: {
    color: "white",
    fontWeight: "bold",
  },
  chipContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
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
