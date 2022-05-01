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
import colours from "../../../theme/colours";
import NavGradient from "../../NavGradient";
import { Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import SelectableChips from "react-native-chip/SelectableChips";
import { firestore } from "../../../firebase/firestore";
import getDirections from "react-native-google-maps-directions";
import * as Clipboard from "expo-clipboard";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { auth } from "../../../firebase/firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

var counter = 0;

const FeedScreen = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [currentEventID, setCurrentEventID] = useState("");

  useEffect(() => {
    setEvents([]);
    getEvents();
  }, []);

  const handleDirections = () => {
    const data = {
      source: {},
      destination: {
        latitude: lat,
        longitude: long,
      },
      params: [
        {
          key: "travelmode",
          value: "driving",
        },
        {
          key: "dir_action",
          value: "navigate",
        },
      ],
    };

    getDirections(data);
  };

  const getEvents = () => {
    firestore
      .collection("events")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          setEvents((prev) => [...prev, data]);
        });
      });
  };

  const handleAttend = (eventID) => {
    firestore
      .collection("events")
      .doc(eventID)
      .get()
      .then((documentSnapshot) => {
        let attendees = documentSnapshot.data().attendees;
        if (attendees.includes(auth.currentUser?.email)) {
          for (let i = 0; i < attendees.length; i++) {
            if (attendees[i] === auth.currentUser?.email) {
              attendees.splice(i, 1);
              break;
            }
          }
          firestore.collection("events").doc(eventID).update({
            attendees: attendees,
          });
        } else {
          attendees = [...attendees, auth.currentUser?.email];
          firestore.collection("events").doc(eventID).update({
            attendees: attendees,
          });
        }
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
      default:
    }
  };

  const setLatLong = (lat, lng) => {
    setLat(lat);
    setLong(lng);
  };

  const copyToClipboard = () => {
    Clipboard.setString(currentEventID);
    Toast.show({
      type: "success",
      text1: "Event ID Copied!",
      visibilityTime: 900,
      position: "top",
    });
  };

  const checkAttendance = (eventID) => {
    firestore
      .collection("events")
      .doc(eventID)
      .get()
      .then((documentSnapshot) => {
        const attendees = documentSnapshot.data().attendees;
        if (attendees.includes(auth.currentUser?.email)) {
          return true;
        } else {
          return false;
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => setSearch(text)}
        value={search}
        style={styles.searchBar}
      />
      <SelectableChips
        initialChips={["Football", "Basketball", "Volleyball"]}
        alertRequired={false}
        valueStyle={{
          color: "white",
          fontSize: 19,
        }}
        chipStyle={{
          borderColor: "black",
          backgroundColor: colours.lightGrey,
          borderWidth: 2,
          width: 110,
          marginTop: 20,
          marginBottom: 10,
          height: 45,
        }}
        chipStyleSelected={{
          backgroundColor: colours.pink,
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTitleContainer}>
                <TouchableOpacity
                  onPress={() => handleAttend(currentEvent.eventID)}
                >
                  {checkAttendance(currentEvent.eventID) ? (
                    <Ionicons
                      name={"bookmark"}
                      size={40}
                      style={styles.bookmark}
                      color={colours.pink}
                    />
                  ) : (
                    <Ionicons
                      name={"bookmark-outline"}
                      size={40}
                      style={styles.bookmark}
                      color={colours.pink}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.modalText}>{currentEvent.eventName}</Text>
              </View>
              <View style={styles.modalBodyContainer}>
                <View style={styles.clipboardContainer}>
                  <Text style={styles.modalBody}>
                    Event ID: {currentEventID}
                  </Text>
                  <TouchableOpacity
                    style={styles.clipboard}
                    onPress={() => copyToClipboard()}
                  >
                    <Ionicons name={"copy-outline"} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalBody}>
                  Sport: {currentEvent.sport}
                </Text>
                <Text style={styles.modalBody}>Time: {currentEvent.time}</Text>
                <Text style={styles.modalBody}>Date: {currentEvent.date}</Text>
                <Text style={styles.modalBody}>
                  Location: {currentEvent.location}
                </Text>
              </View>
              <Pressable
                style={[styles.button, styles.maps]}
                onPress={handleDirections}
              >
                <Text style={styles.modalButtonText}>Open Maps</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <ScrollView style={styles.scrollView}>
        {events.map((event) => {
          counter++;
          return (
            <TouchableOpacity
              key={counter}
              onPress={() => {
                setModalVisible(true);
                setCurrentEvent(event);
                setCurrentEventID(event.eventID.slice(0, 8));
                {
                  setLatLong(event.lat, event.long);
                }
              }}
            >
              <View style={styles.eventContainer}>
                {renderBall(event.sport)}
                <View style={styles.attendContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.eventName}>{event.eventName}</Text>
                    <Text style={styles.eventDate}>
                      {event.date} - {event.time}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleAttend(event.eventID)}>
                    {checkAttendance(event.eventID) ? (
                      <Ionicons
                        name={"bookmark"}
                        size={40}
                        color={colours.pink}
                      />
                    ) : (
                      <Ionicons
                        name={"bookmark-outline"}
                        size={40}
                        color={colours.pink}
                      />
                    )}
                  </TouchableOpacity>
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

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.backgroundDark,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 50,
  },
  searchBar: {
    width: "90%",
    marginTop: 30,
  },
  event: {
    width: "80%",
    backgroundColor: "white",
  },
  eventContainer: {
    backgroundColor: colours.lightGrey,
    borderColor: colours.pink,
    borderWidth: 2,
    margin: 20,
    borderRadius: 5,
    height: 90,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  eventName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 10,
  },
  scrollView: {
    width: "100%",
    marginBottom: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "95%",
    height: "60%",
    marginTop: 40,
    backgroundColor: colours.lightGrey,
    borderRadius: 20,
    borderColor: colours.pink,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: colours.backgroundDark,
    marginTop: "0%",
    width: "70%",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },
  modalBody: {
    color: "white",
    fontWeight: "bold",
    margin: 15,
    fontSize: 15,
  },
  modalBodyContainer: {
    width: "100%",
    backgroundColor: colours.backgroundDark,
    borderRadius: 15,
  },
  maps: {
    backgroundColor: colours.purple,
    width: "70%",
    marginTop: "10%",
    marginBottom: "5%",
  },
  eventDate: {
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
    paddingTop: 10,
  },
  ball: {
    height: 50,
    width: 50,
    marginLeft: 15,
    marginRight: 10,
  },
  infoContainer: {
    marginBottom: 10,
  },
  clipboard: {
    backgroundColor: "white",
    height: 20,
    width: 20,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  clipboardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  modalTitleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
  },
  bookmark: {
    marginRight: "5%",
  },
});
