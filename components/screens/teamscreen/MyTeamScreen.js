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
import { useState, useEffect } from "react";
import NavGradient from "../../NavGradient";
import { firestore } from "../../../firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { auth } from "../../../firebase/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { darkTheme, lightTheme } from "../../../theme/themes";
import TeamBookmark from "./TeamBookmark";
import TeamEditButton from "./TeamEditButton";
import { BlurView } from "expo-blur";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

var counter = 0;

const MyTeamScreen = ({
  darkModeEnabled,
  setNewTeamShow,
  setEditTeamShow,
  setEditTeamID,
  setTeamFeedShow,
}) => {
  const [teams, setTeams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentTeamID, setCurrentTeamID] = useState("");
  const [numMembers, setNumMembers] = useState(0);
  const [memberList, setMemberList] = useState([]);

  const isFocused = useIsFocused();
  const currentUser = auth.currentUser?.email;

  useEffect(() => {
    setTeams([]);
    getTeams();
  }, [isFocused]);

  const getTeams = () => {
    let querySize = 0;
    firestore
      .collection("teams")
      .where("members", "array-contains", currentUser)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          setTeams((prev) => [...prev, data]);
        });
        {
          if (querySnapShot.size === 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
        }
      });
    return querySize;
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

  const getMemberList = (teamID) => {
    firestore
      .collection("teams")
      .doc(teamID)
      .get()
      .then((documentSnapshot) => {
        setMemberList(documentSnapshot.data().members);
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
          setMemberList(members);
        } else {
          members = [...members, auth.currentUser?.email];
          firestore.collection("teams").doc(teamID).update({
            members: members,
            numMembers: members.length,
          });
          setNumMembers(members.length);
          setMemberList(members);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handleCreateTeam = () => {
    setNewTeamShow(true);
  };

  const handleEditTeam = () => {
    setEditTeamShow(true);
  };

  const handleTeamFeed = () => {
    setTeamFeedShow(true);
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
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            { color: darkModeEnabled ? darkTheme.text : lightTheme.text },
          ]}
        >
          My Teams
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.feedButton,
              {
                backgroundColor: darkModeEnabled
                  ? darkTheme.cardBackground
                  : lightTheme.cardBackground,
              },
            ]}
            onPress={handleTeamFeed}
          >
            <Ionicons
              name={"earth"}
              size={30}
              style={[
                {
                  color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                },
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.createButton,
              {
                backgroundColor: darkModeEnabled
                  ? darkTheme.cardBackground
                  : lightTheme.cardBackground,
              },
            ]}
            onPress={handleCreateTeam}
          >
            <Ionicons
              name={"add-outline"}
              size={35}
              style={[
                styles.icon,
                {
                  color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isEmpty && (
        <View style={styles.emptyContainer}>
          <Text
            style={[
              styles.noEventText,
              { color: darkModeEnabled ? darkTheme.text : lightTheme.text },
            ]}
          >
            You Have No Teams
          </Text>
        </View>
      )}

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
                  Members:
                </Text>
                <ScrollView>
                  {memberList.map((member) => {
                    return (
                      <View style={styles.membersContainer}>
                        <Text
                          style={[
                            styles.memberName,
                            {
                              color: darkModeEnabled
                                ? darkTheme.text
                                : lightTheme.text,
                            },
                          ]}
                        >
                          {member}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>

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
                onPress={() => setModalVisible(!modalVisible)}
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
                getMemberList(team.teamID);
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
                  <TeamEditButton
                    handleEditTeam={handleEditTeam}
                    teamID={team.teamID}
                    darkModeEnabled={darkModeEnabled}
                    setEditTeamID={setEditTeamID}
                  />
                  <TeamBookmark
                    handleAttend={handleAttend}
                    teamID={team.teamID}
                  />
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

export default MyTeamScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 50,
    marginLeft: "5%",
    marginRight: "10%",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  event: {
    width: "80%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  ball: {
    height: 50,
    width: 50,
    marginLeft: 15,
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5%",
    marginBottom: "5%",
    width: "95%",
  },
  createButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: darkTheme.pink,
    borderWidth: 2,
  },
  createText: {
    fontWeight: "bold",
    fontSize: 30,
    bottom: 6,
    right: 0.5,
  },
  noEventText: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  emptyContainer: {
    width: "90%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: darkTheme.pink,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginLeft: "5%",
    marginTop: "60%",
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
    height: "70%",
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
  feedButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: darkTheme.pink,
    borderWidth: 2,
  },
  buttonContainer: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  membersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberName: {
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: "5%",
  },
});
