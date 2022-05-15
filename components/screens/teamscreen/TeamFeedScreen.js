import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import NavGradient from "../../NavGradient";
import SearchBar from "react-native-platform-searchbar";
import { useState, useEffect, useMemo } from "react";
import SelectableChips from "react-native-chip/SelectableChips";
import { firestore } from "../../../firebase/firestore";
import * as Clipboard from "expo-clipboard";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { auth } from "../../../firebase/firebase";
import { LogBox } from "react-native";
import { BlurView } from "expo-blur";
import TeamBookmark from "./TeamBookmark";
import { darkTheme, lightTheme } from "../../../theme/themes";
import debounce from "lodash.debounce";

LogBox.ignoreLogs([
  "Setting a timer",
  "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.",
]);

var counter = 0;

const TeamFeedScreen = ({
  darkModeEnabled,
  newTeamShow,
  editTeamShow,
  setEditTeamShow,
  setTeamFeedShow,
}) => {
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState({});

  const [selectedSport, setSelectedSport] = useState([]);
  const [currentTeamID, setCurrentTeamID] = useState("");
  const [numMembers, setNumMembers] = useState(0);
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    setTeams([]);
    getTeams();
    return () => {
      debouncedResults.cancel();
    };
  }, [search, selectedSport, newTeamShow, editTeamShow]);

  const debouncedResults = useMemo(() => {
    return debounce(setSearch, 300);
  }, []);

  const getTeams = () => {
    let query = firestore.collection("teams");
    if (selectedSport.length > 0) {
      query = query.where("sport", "in", selectedSport);
    }
    query
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          {
            let name = data.teamName;
            name = name.toLowerCase();
            let id = data.teamID;
            if (id.includes(search) || name.includes(search.toLowerCase())) {
              setTeams((prev) => [...prev, data]);
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAttend = (teamID) => {
    firestore
      .collection("teams")
      .doc(teamID)
      .get()
      .then((documentSnapshot) => {
        let members = documentSnapshot.data().members;
        if (members.includes(auth.currentUser?.email)) {
          for (let i = 0; i < members.length; i++) {
            if (members[i] === auth.currentUser?.email) {
              members.splice(i, 1);
              break;
            }
          }
          firestore.collection("teams").doc(teamID).update({
            members: members,
            numMembers: members.length,
          });
          setNumMembers(members.length);
          setMembersList(members);
        } else {
          members = [...members, auth.currentUser?.email];
          firestore.collection("teams").doc(teamID).update({
            members: members,
            numMembers: members.length,
          });
          setNumMembers(members.length);
          setMembersList(members);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    setTeamFeedShow(false);
  };

  const renderBall = (sport) => {
    switch (sport) {
      case "Basketball":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Basketball.png")}
          />
        );
      case "Volleyball":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Volleyball.png")}
          />
        );
      case "Football":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Football.png")}
          />
        );
      case "Cricket":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Cricket.png")}
          />
        );
      case "eSports":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Esports.png")}
          />
        );
      case "Rugby":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Rugby.png")}
          />
        );
      case "Sailing":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Sailing.png")}
          />
        );
      case "Tennis":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Tennis.png")}
          />
        );
      case "Waterpolo":
        return (
          <Image
            style={styles.ball}
            source={require("../../../images/Waterpolo.png")}
          />
        );
      default:
    }
  };

  const getNumMembers = (teamID) => {
    firestore
      .collection("teams")
      .doc(teamID)
      .get()
      .then((documentSnapshot) => {
        setNumMembers(documentSnapshot.data().numMembers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMembersList = (teamID) => {
    firestore
      .collection("teams")
      .doc(teamID)
      .get()
      .then((documentSnapshot) => {
        setMembersList(documentSnapshot.data().members);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const copyToClipboard = () => {
    Clipboard.setString(currentTeamID);
    Toast.show({
      type: "success",
      text1: "Team ID Copied!",
      visibilityTime: 1000,
      position: "top",
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: darkModeEnabled
            ? darkTheme.background
            : lightTheme.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <SearchBar
          placeholder="Search Team Name or ID"
          height={60}
          inputStyle={{paddingLeft: 50}}
          onChangeText={debouncedResults}
          style={styles.searchBar}
          placeholderTextColor={
            darkModeEnabled ? darkTheme.text : lightTheme.text
          }
          theme={darkModeEnabled ? "dark" : "light"}
          keyboardAppearance={darkModeEnabled ? "dark" : "light"}
        />
        <TouchableOpacity
          style={[
            styles.myTeamsButton, 
            {
              backgroundColor: darkModeEnabled
                ? darkTheme.cardBackground
                : lightTheme.cardBackground,
            },
          ]}
          onPress={handleBack}
        >
          <Ionicons
            name={"list-circle-outline"}
            size={30}
            style={[
              styles.icon,
              {
                color: darkModeEnabled ? darkTheme.text : lightTheme.text,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <SelectableChips
        initialChips={["Football", "Basketball", "Volleyball"]}
        onChangeChips={(chips) => setSelectedSport(chips)}
        alertRequired={false}
        valueStyle={{
          color: darkModeEnabled ? darkTheme.text : lightTheme.text,
          fontSize: 19,
        }}
        chipStyle={{
          borderColor: "black",
          backgroundColor: darkModeEnabled
            ? darkTheme.cardBackground
            : lightTheme.cardBackground,
          borderWidth: 2,
          width: 110,
          marginTop: 20,
          marginBottom: 10,
          height: 45,
        }}
        chipStyleSelected={{
          backgroundColor: darkTheme.pink,
          borderColor: "black",
          borderWidth: 2,
        }}
      />

      {setModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <BlurView
            intensity={40}
            tint={darkModeEnabled ? "dark" : "light"}
            style={styles.blurContainer}
          >
            <Toast />
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: darkModeEnabled
                    ? darkTheme.cardBackground
                    : lightTheme.cardBackground,
                },
              ]}
            >
              <View style={styles.modalTitleContainer}>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                    },
                  ]}
                >
                  {currentTeam.teamName}
                </Text>
                <View style={styles.bookmarkAndAttendees}>
                  <TeamBookmark
                    handleAttend={handleAttend}
                    teamID={currentTeam.teamID}
                  />
                  <View style={styles.attendeesContainer}>
                    <Ionicons
                      name={"people"}
                      color={darkModeEnabled ? darkTheme.text : lightTheme.text}
                      size={20}
                    />
                    <Text
                      style={[
                        styles.attendeesText,
                        {
                          color: darkModeEnabled
                            ? darkTheme.text
                            : lightTheme.text,
                        },
                      ]}
                    >
                      {numMembers}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.modalBodyContainer,
                  {
                    backgroundColor: darkModeEnabled
                      ? darkTheme.background
                      : lightTheme.background,
                  },
                ]}
              >
                <View style={styles.clipboardContainer}>
                  <Text
                    style={[
                      styles.modalBody,
                      {
                        color: darkModeEnabled
                          ? darkTheme.text
                          : lightTheme.text,
                      },
                    ]}
                  >
                    Team ID: {currentTeamID}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.clipboard,
                      {
                        backgroundColor: darkModeEnabled
                          ? darkTheme.background
                          : lightTheme.background,
                      },
                    ]}
                    onPress={() => copyToClipboard()}
                  >
                    <Ionicons
                      name={"copy-outline"}
                      color={darkModeEnabled ? darkTheme.text : lightTheme.text}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[
                    styles.modalBody,
                    {
                      color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                    },
                  ]}
                >
                  Captain: {currentTeam.captain}
                </Text>

                <Text
                  style={[
                    styles.modalBody,
                    {
                      color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                    },
                  ]}
                >
                  Sport: {currentTeam.sport}
                </Text>

                <Text
                  style={[
                    styles.modalBody,
                    {
                      color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                    },
                  ]}
                >
                  Members: {membersList}
                </Text>

                <Text
                  style={[
                    styles.modalBody,
                    {
                      color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                    },
                  ]}
                >
                  Information: {currentTeam.info}
                </Text>
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </BlurView>
        </Modal>
      )}
      <ScrollView style={styles.scrollView}>
        {teams.map((team) => {
          counter++;
          return (
            <TouchableOpacity
              key={counter}
              onPress={() => {
                setModalVisible(true);
                setCurrentTeam(team);
                setCurrentTeamID(team.teamID.slice(0, 8));
                getNumMembers(team.teamID);
                getMembersList(team.teamID);
              }}
            >
              <View
                style={[
                  styles.eventContainer,
                  {
                    backgroundColor: darkModeEnabled
                      ? darkTheme.cardBackground
                      : lightTheme.cardBackground,
                  },
                ]}
              >
                {renderBall(team.sport)}
                <View style={styles.attendContainer}>
                  <View style={styles.infoContainer}>
                    <Text
                      style={[
                        styles.eventName,
                        {
                          color: darkModeEnabled
                            ? darkTheme.text
                            : lightTheme.text,
                        },
                      ]}
                    >
                      {team.teamName}
                    </Text>
                  </View>
                  <TeamBookmark handleAttend={handleAttend} teamID={team.teamID} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <NavGradient />
    </SafeAreaView>
  );
};

export default TeamFeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
  },
  searchBar: {
    margin: 40,
    width: "67%",     
  },
  scrollView: {
    width: "100%",
    marginBottom: 55,
  },
  eventContainer: {
    borderWidth: 2,
    margin: 20,
    height: 90,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderColor: darkTheme.pink,
    borderRadius: 5,
  },
  attendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  infoContainer: {
    marginBottom: 10,
  },
  eventName: {
    fontWeight: "bold",
    fontSize: 28,
    paddingLeft: 10,
    paddingTop: 10,
  },
  eventDate: {
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "95%",
    height: "60%",
    marginTop: 40,
    borderRadius: 20,
    borderColor: darkTheme.pink,
    borderWidth: 2,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 40,
  },
  bookmarkAndAttendees: {
    alignItems: "center",
  },
  attendeesContainer: {
    flexDirection: "row",
  },
  attendeesText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  modalBodyContainer: {
    width: "100%",
    backgroundColor: darkTheme.background,
    borderRadius: 15,
  },
  clipboardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalBody: {
    fontWeight: "bold",
    margin: 15,
    fontSize: 15,
  },
  clipboard: {
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "70%",
  },
  buttonMap: {
    backgroundColor: darkTheme.purple,
    width: "70%",
    marginTop: "10%",
    marginBottom: "5%",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: darkTheme.pink,
    marginTop: "20%",
  },
  ball: {
    height: 50,
    width: 50,
    marginLeft: 15,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  myTeamsButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: darkTheme.pink,
    borderWidth: 2,
  },
  icon: {
    marginLeft: "5%"
  }
});
