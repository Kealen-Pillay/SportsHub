import { StyleSheet } from "react-native";
import React from "react";
import MyEventScreen from "./MyEventScreen";
import NewEventScreen from "../eventscreen/NewEventScreen";

const MyEventsTab = ({ newEventShow, setNewEventShow, darkModeEnabled }) => {
  return !newEventShow ? <MyEventScreen setNewEventShow={setNewEventShow} darkModeEnabled={darkModeEnabled}/> : <NewEventScreen darkModeEnabled={darkModeEnabled} setNewEventShow={setNewEventShow}/>;
};

export default MyEventsTab;

const styles = StyleSheet.create({});