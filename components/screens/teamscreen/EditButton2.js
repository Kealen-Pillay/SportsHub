import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { darkTheme, lightTheme } from "../../../theme/themes";
import { firestore } from "../../../firebase/firestore";
import { auth } from "../../../firebase/firebase";

const EditButton2 = ({
  handleEditTeam,
  teamID,
  darkModeEnabled,
  setEditTeamID,
}) => {
  const checkCaptain = (teamID) => {
    firestore
      .collection("teams")
      .doc(teamID)
      .get()
      .then((documentSnapshot) => {
        const captain = documentSnapshot.data().captain;
        if (captain == auth.currentUser?.email) {
          setIsEditable(true);
        } else {
          setIsEditable(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [isEditable, setIsEditable] = useState(checkCaptain(teamID));
  return (
    <TouchableOpacity
      onPress={() => {
        handleEditTeam();
        setIsEditable(false);
        setEditTeamID(teamID);
      }}
    >
      <Ionicons
        name={isEditable ? "pencil-sharp" : ""}
        size={40}
        color={darkModeEnabled ? darkTheme.text : lightTheme.text}
      />
    </TouchableOpacity>
  );
};

export default EditButton2;

const styles = StyleSheet.create({});
