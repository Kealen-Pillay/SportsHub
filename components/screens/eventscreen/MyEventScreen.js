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
import getDirections from "react-native-google-maps-directions";
import { useIsFocused } from "@react-navigation/native";
import { auth } from "../../../firebase/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { darkTheme, lightTheme } from "../../../theme/themes";
import Bookmark from "../feedscreen/Bookmark";
import { BlurView } from "expo-blur";
import Toast from "react-native-toast-message";

const MyEventScreen = ({ darkModeEnabled, setNewEventShow }) => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentEventID, setCurrentEventID] = useState("");

  const isFocused = useIsFocused();
  const currentUser = auth.currentUser?.email;

  useEffect(() => {
    setEvents([]);
    getEvents();
  }, [isFocused]);

  const getEvents = () => {
    let querySize = 0;
    firestore
      .collection("events")
      .where("attendees", "array-contains", currentUser)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          setEvents((prev) => [...prev, data]);
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

  const handleCreateEvent = () => {
    setNewEventShow(true);
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
          My Events
        </Text>
        <TouchableOpacity
          style={[
            styles.createButton,
            {
              backgroundColor: darkModeEnabled
                ? darkTheme.cardBackground
                : lightTheme.cardBackground,
            },
          ]}
          onPress={handleCreateEvent}
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
      {isEmpty && (
        <View style={styles.emptyContainer}>
          <Text
            style={[
              styles.noEventText,
              { color: darkModeEnabled ? darkTheme.text : lightTheme.text },
            ]}
          >
            You Have No Events
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
                  {currentEvent.eventName}
                </Text>
                <Bookmark
                  handleAttend={handleAttend}
                  eventID={currentEvent.eventID}
                />
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
                    Event ID: {currentEventID}
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
                  Sport: {currentEvent.sport}
                </Text>
                <Text
                  style={[
                    styles.modalBody,
                    {
                      color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                    },
                  ]}
                >
                  Time: {currentEvent.time}
                </Text>
                <Text
                  style={[
                    styles.modalBody,
                    {
                      color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                    },
                  ]}
                >
                  Date: {currentEvent.date}
                </Text>
                <Text
                  style={[
                    styles.modalBody,
                    {
                      color: darkModeEnabled ? darkTheme.text : lightTheme.text,
                    },
                  ]}
                >
                  Location: {currentEvent.location}
                </Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonMap]}
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
          </BlurView>
        </Modal>
      )}
      <ScrollView style={styles.scrollView}>
        {events.map((event) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setCurrentEvent(event);
                {
                  setLatLong(event.lat, event.long);
                }
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
                {renderBall(event.sport)}
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
                      {event.eventName}
                    </Text>
                    <Text
                      style={[
                        styles.eventDate,
                        {
                          color: darkModeEnabled
                            ? darkTheme.text
                            : lightTheme.text,
                        },
                      ]}
                    >
                      {event.date} - {event.time}
                    </Text>
                  </View>
                </View>
                <Bookmark handleAttend={handleAttend} eventID={event.eventID} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <NavGradient />
    </SafeAreaView>
  );
};

export default MyEventScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 50,
    marginLeft: "5%",
    marginRight: "13%",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
  },
  searchBar: {
    width: "90%",
    marginTop: 30,
  },
  event: {
    width: "80%",
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
  eventName: {
    fontWeight: "bold",
    fontSize: 28,
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
    height: "70%",
    borderRadius: 20,
    borderColor: darkTheme.pink,
    borderWidth: 2,
    padding: 35,
    paddingTop: 20,
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
  buttonClose: {
    backgroundColor: darkTheme.pink,
    marginTop: 0,
    width: "70%",
  },
  modalButtonText: {
    color: darkTheme.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 50,
  },
  modalBody: {
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  modalBodyContainer: {
    width: "100%",
    backgroundColor: darkTheme.background,
    borderRadius: 15,
  },
  maps: {
    backgroundColor: darkTheme.purple,
    width: "70%",
    marginTop: "10%",
    marginBottom: "10%",
  },
  eventDate: {
    fontWeight: "bold",
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
  icon: {
    marginLeft: "5%",
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
  attendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});
