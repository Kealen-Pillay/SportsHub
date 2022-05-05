import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { darkTheme } from "../../../theme/themes";
import { firestore } from "../../../firebase/firestore";
import { auth } from "../../../firebase/firebase";

const Bookmark = ({ handleAttend, eventID }) => {
  const checkAttendance = (eventID) => {
    firestore
      .collection("events")
      .doc(eventID)
      .get()
      .then((documentSnapshot) => {
        const attendees = documentSnapshot.data().attendees;
        if (attendees.includes(auth.currentUser?.email)) {
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
  const [isAttending, setIsAttending] = useState(checkAttendance(eventID));
  return (
    <TouchableOpacity
      onPress={() => {
        handleAttend(eventID);
        setIsAttending(!isAttending);
      }}
    >
      <Ionicons
        name={isAttending ? "bookmark" : "bookmark-outline"}
        size={40}
        style={styles.bookmark}
        color={darkTheme.pink}
      />
    </TouchableOpacity>
  );
};

export default Bookmark;

const styles = StyleSheet.create({});
