import { StyleSheet } from "react-native";
import React from "react";
import MyTeamScreen from "./MyTeamScreen";
import NewTeamScreen from "./NewTeamScreen";
import EditTeamScreen from "./EditTeamScreen";
import TeamFeedScreen from "./TeamFeedScreen";
import { useState } from "react";

const MyTeamsTab = ({
  newTeamShow,
  setNewTeamShow,
  darkModeEnabled,
  editTeamShow,
  setEditTeamShow,
  setTeamFeedShow,
  teamFeedShow,
}) => {
  const [editTeamID, setEditTeamID] = useState("");

  if (newTeamShow) {
    return (
      <NewTeamScreen
        darkModeEnabled={darkModeEnabled}
        setNewTeamShow={setNewTeamShow}
      />
    );
  } else if (editTeamShow) {
    return (
      <EditTeamScreen
        darkModeEnabled={darkModeEnabled}
        setEditTeamShow={setEditTeamShow}
        editTeamID={editTeamID}
        setEditTeamID={setEditTeamID}
      />
    );
  } else if (teamFeedShow) {
    return (
      <TeamFeedScreen
      newTeamShow={newTeamShow}
      darkModeEnabled={darkModeEnabled}
      editTeamShow={editTeamShow}
      setTeamFeedShow={setTeamFeedShow}
      />
    );
  } else {
    return (
      <MyTeamScreen
        setNewTeamShow={setNewTeamShow}
        darkModeEnabled={darkModeEnabled}
        setEditTeamShow={setEditTeamShow}
        setEditTeamID={setEditTeamID}
        setTeamFeedShow={setTeamFeedShow}
      />
    );
  }
};

export default MyTeamsTab;

const styles = StyleSheet.create({});
