import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { darkTheme } from "../../../theme/themes";
import { firestore } from "../../../firebase/firestore";
import { auth } from "../../../firebase/firebase";

const TeamBookmark = ({ handleAttend, teamID }) => {
  const checkAttendance = (teamID) => {
    firestore
      .collection("teams")
      .doc(teamID)
      .get()
      .then((documentSnapshot) => {
        const members = documentSnapshot.data().members;
        if (members.includes(auth.currentUser?.email)) {
          setIsAttending(true);
          return true;
        } else {
          setIsAttending(false);
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [isAttending, setIsAttending] = useState(checkAttendance(teamID));
  return (
    <TouchableOpacity
      onPress={() => {
        handleAttend(teamID);
        setIsAttending(!isAttending);
      }}
    >
      <Ionicons
        name={isAttending ? "person" : "person-add-outline"}
        size={40}
        style={styles.bookmark}
        color={darkTheme.pink}
      />
    </TouchableOpacity>
  );
};

export default TeamBookmark;

const styles = StyleSheet.create({});
