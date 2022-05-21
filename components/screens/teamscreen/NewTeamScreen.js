import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  View,
  Image,
} from "react-native";
import { firestore } from "../../../firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { Dropdown } from "react-native-element-dropdown";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "../../../node_modules/@react-navigation/core";
import { auth } from "../../../firebase/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavGradient from "../../NavGradient";
import { darkTheme, lightTheme } from "../../../theme/themes";

const NewTeamScreen = ({ darkModeEnabled, setNewTeamShow }) => {
  const [teamName, setTeamName] = useState("");
  const [sport, setSport] = useState("");
  const [info, setInfo] = useState("");

  const starImgFilled = require("../../../images/star_filled.png");
  const starImgCorner = require("../../../images/star_corner.png");
  const [defaultRating, setdefaultRating] = useState(3);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  const validSports = [
    { label: "Basketball", sport: "Basketball" },
    { label: "Football", sport: "Football" },
    { label: "Volleyball", sport: "Volleyball" },
    { label: "Tennis", sport: "Tennis" },
    { label: "eSports", sport: "eSports" },
    { label: "Cricket", sport: "Cricket" },
    { label: "Sailing", sport: "Sailing" },
    { label: "Rugby", sport: "Rugby" },
    { label: "Waterpolo", sport: "Waterpolo" },
  ];

  const navigation = useNavigation();

  const handlePublish = () => {
    if (teamName.length == 0 || sport.length == 0) {
      showMessage({
        message: "Please fill out name and sport fields before publishing",
        type: "danger",
        hideStatusBar: true,
      });
    } else if (teamName.length > 10) {
      showMessage({
        message: "Team name should be 10 characters or less",
        type: "danger",
        hideStatusBar: true,
      });
    } else {
      addTeam();
      setNewTeamShow(false);
    }
  };
  const handleBack = () => {
    setNewTeamShow(false);
  };
  const addTeam = () => {
    const teamID = uuid();
    firestore
      .collection("teams")
      .doc(teamID)
      .set({
        teamName: teamName,
        teamID: teamID,
        sport: sport,
        info: info,
        captain: auth.currentUser?.email,
        members: [auth.currentUser?.email],
        numMembers: 1,
        rating: defaultRating,
      })
      .then(function (docRef) {
        showMessage({
          message: "Team Created!",
          type: "success",
          hideStatusBar: true,
        });
      })
      .then(() => {
        navigation.navigate("Dashboard");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        showMessage({
          message: "ERROR adding team",
          type: "danger",
          hideStatusBar: true,
        });
      });
  };

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

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: darkModeEnabled
            ? darkTheme.background
            : lightTheme.background,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.icon}>
          <Ionicons
            name={"chevron-back-outline"}
            color={darkTheme.pink}
            size={45}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            { color: darkModeEnabled ? darkTheme.text : lightTheme.text },
          ]}
        >
          New Team
        </Text>
      </View>

      <TextInput
        style={styles.text}
        value={teamName}
        onChangeText={(text) => setTeamName(text)}
        placeholder="Team Name"
        placeholderTextColor={"gray"}
      />

      <Dropdown
        style={styles.text}
        data={validSports}
        search
        maxHeight={200}
        labelField="label"
        valueField="sport"
        placeholder="Sport"
        placeholderStyle={{ color: "gray", fontSize: 14 }}
        selectedTextStyle={{ color: "black", fontSize: 13 }}
        searchPlaceholder="Search..."
        value={sport}
        onChange={(item) => {
          setSport(item.sport);
        }}
        dropdownPosition={"bottom"}
      />
      <RatingBox />
      <TextInput
        style={[styles.text, styles.infoText]}
        value={info}
        multiline ={true}
        onChangeText={(text) => setInfo(text)}
        placeholder="Information"
        placeholderTextColor={"gray"}
      />
      <TouchableOpacity style={styles.button} onPress={handlePublish}>
        <Text style={styles.buttonText}>Create Team</Text>
      </TouchableOpacity>
      <NavGradient />
    </KeyboardAvoidingView>
  );
};

export default NewTeamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "15%",
    marginBottom: "10%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
  },
  text: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 2,
    width: "90%",
    borderRadius: 10,
    marginBottom: "10%",
    height: 50,
  },
  button: {
    marginTop: 20,
    backgroundColor: darkTheme.purple,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderColor: darkTheme.pink,
    borderWidth: 2,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: "90%",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    marginLeft: "2%",
    marginRight: "5%",
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
    width: "90%",
    marginBottom: "10%",
    borderRadius: 5,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  starImgStyle: {
    width: 35,
    height: 35,
  },
  infoText: {
    height: "20%",
    textAlignVertical: "top",
    paddingVertical: 10,
  },
});
