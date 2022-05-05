import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { darkTheme } from "../../../theme/themes";
import { firestore } from "../../../firebase/firestore";
import { auth } from "../../../firebase/firebase";

const EditButton = ({ handleEditEvent, eventID, darkModeEnabled, setEditEventID }) => {
    const checkOwner = (eventID) => {
        firestore
          .collection("events")
          .doc(eventID)
          .get()
          .then((documentSnapshot) => {
            const owner = documentSnapshot.data().owner;
            if (owner == auth.currentUser?.email) {
              setIsEditable(true);
            } else {
              setIsEditable(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        };
  const [isEditable, setIsEditable] = useState(checkOwner(eventID));
  return (
    <TouchableOpacity onPress={() => {
        handleEditEvent()
        setIsEditable(false)
        setEditEventID(eventID)
      }}>
        <Ionicons
          name={isEditable ? "pencil-sharp" : ""}
          size={40}
          color={darkModeEnabled ? darkTheme.text : lightTheme.text}
        />


      </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({});
