import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colours from "../../../theme/colours";
import { Card, Title, Chip } from "react-native-paper";
import { useState } from "react";

const ProfileScreen = () => {
  const [basketballChipSelected, setBasketballChipSelected] = useState(false);
  const [footballChipSelected, setFootballChipSelected] = useState(false);
  const [volleyballChipSelected, setVolleyballChipSelected] = useState(false);


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.usernameCard}>
          <Card.Content>
            <Title style={styles.usernameText}>USERNAME</Title>
            <View style={styles.chipContainer}>
              <Chip
                mode="outlined"
                selectedColor={colours.pink}
                selected={basketballChipSelected}
                style={styles.chip}
                onPress={() => {
                  setBasketballChipSelected(!basketballChipSelected);
                }}
              >
                <Text style={styles.chipText}>Basketball</Text>
              </Chip>
              <Chip
                mode="outlined"
                selectedColor={colours.pink}
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
                selectedColor={colours.pink}
                selected={volleyballChipSelected}
                style={styles.chip}
                onPress={() => {
                  setVolleyballChipSelected(!volleyballChipSelected);
                }}
              >
                <Text style={styles.chipText}>Volleyball</Text>
              </Chip>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.cardContainer}>
          <Card style={styles.ratingCard}>
              <Card.Content>

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
  cardContainer: {
    height: 200,
    width: "90%",
    marginBottom: 20,
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
    fontSize: 30,
  },
  chip: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: colours.lightGrey,
    width: "40%",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 5,
  },
  chipText: {
    color: "white",
    fontWeight: "bold",
  },
  chipContainer: {
      flexDirection: "column",
      flexWrap: "wrap",
      flex: 1,
      marginRight: 60,
  },
  ratingCard: {
    backgroundColor: colours.lightGrey,
    borderColor: colours.pink,
    borderWidth: 2,
    borderRadius: 15,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  }
});
