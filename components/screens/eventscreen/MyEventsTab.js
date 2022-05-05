import { StyleSheet } from "react-native";
import React from "react";
import MyEventScreen from "./MyEventScreen";
import NewEventScreen from "../eventscreen/NewEventScreen";
import EditEventScreen from "./EditEventScreen";

const MyEventsTab = ({
  newEventShow,
  setNewEventShow,
  darkModeEnabled,
  editEventShow,
  setEditEventShow,
}) => {
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
      />
    );
  } else {
    return (
      <MyEventScreen
        setNewEventShow={setNewEventShow}
        darkModeEnabled={darkModeEnabled}
        setEditEventShow={setEditEventShow}
      />
    );
  }
};

export default MyEventsTab;

const styles = StyleSheet.create({});
