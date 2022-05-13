import { StyleSheet } from "react-native";
import React from "react";
import MyTeamScreen from "./MyTeamScreen";
import NewTeamScreen from "./NewTeamScreen";
// import NewEventScreen from "../eventscreen/NewEventScreen";
// import EditEventScreen from "./EditEventScreen";
import { useState } from "react";

const MyTeamsTab = ({
  newTeamShow,
  setNewTeamShow,
  darkModeEnabled,
  editTeamShow,
  setEditTeamShow,
}) => {
  const [editTeamID, setEditTeamID] = useState("");

//   return (
//     <MyTeamScreen
//       setNewTeamShow={setNewTeamShow}
//       darkModeEnabled={darkModeEnabled}
//       setEditTeamShow={setEditTeamShow}
//       setEditTeamID={setEditTeamID}
//     />
//   );

  if (newTeamShow) {
    return (
      <NewTeamScreen
        darkModeEnabled={darkModeEnabled}
        setNewTeamShow={setNewTeamShow}
      />
    );
  } 
//   else if (editTeamShow) {
//     return (
//       <EditEventScreen
//         darkModeEnabled={darkModeEnabled}
//         setEditTeamShow={setEditTeamShow}
//         editTeamID={editTeamID}
//         setEditTeamID={setEditTeamID}
//       />
//     );
//   } 
  else {
    return (
      <MyTeamScreen
      setNewTeamShow={setNewTeamShow}
      darkModeEnabled={darkModeEnabled}
      setEditTeamShow={setEditTeamShow}
      setEditTeamID={setEditTeamID}
    />
    );
  }
};

export default MyTeamsTab;

const styles = StyleSheet.create({});
