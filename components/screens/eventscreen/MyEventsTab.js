import { StyleSheet } from "react-native";
import React from "react";
import MyEventScreen from "./MyEventScreen";
import NewEventScreen from "../eventscreen/NewEventScreen";
import EditEventScreen from "./EditEventScreen";
import { useState } from "react";

const MyEventsTab = ({
  newEventShow,
  setNewEventShow,
  darkModeEnabled,
  editEventShow,
  setEditEventShow,
}) => {
  const [editEventID, setEditEventID] = useState("");

  if (newEventShow) {
    return (
      <NewEventScreen
        darkModeEnabled={darkModeEnabled}
        setNewEventShow={setNewEventShow}
      />
    );
  } else if (editEventShow) {
    return (
      <EditEventScreen
        darkModeEnabled={darkModeEnabled}
        setEditEventShow={setEditEventShow}
        editEventID={editEventID}
        setEditEventID={setEditEventID}
      />
    );
  } else {
    return (
      <MyEventScreen
        setNewEventShow={setNewEventShow}
        darkModeEnabled={darkModeEnabled}
        setEditEventShow={setEditEventShow}
        setEditEventID={setEditEventID}
      />
    );
  }
};

export default MyEventsTab;

const styles = StyleSheet.create({});
