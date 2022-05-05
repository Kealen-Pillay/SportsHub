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
import getDirections from "react-native-google-maps-directions";
import * as Clipboard from "expo-clipboard";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { auth } from "../../../firebase/firebase";
import { LogBox } from "react-native";
import { BlurView } from "expo-blur";
import Bookmark from "../feedscreen/Bookmark";
import { darkTheme, lightTheme } from "../../../theme/themes";
import debounce from "lodash.debounce";

LogBox.ignoreLogs(["Setting a timer"]);

var counter = 0;

const FeedScreen = ({ darkModeEnabled }) => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [selectedSport, setSelectedSport] = useState([]);
  const [currentEventID, setCurrentEventID] = useState("");

  useEffect(() => {
    setEvents([]);
    getEvents();
    return () => {
      debouncedResults.cancel();
    };
  }, [search, selectedSport]);

  const debouncedResults = useMemo(() => {
    return debounce(setSearch, 300);
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
    let query = firestore.collection("events");
    if (selectedSport.length > 0) {
      query = query.where("sport", "in", selectedSport);
    }
    query.get().then((querySnapShot) => {
      querySnapShot.forEach((snapshot) => {
        let data = snapshot.data();
        {
          let name = data.eventName;
          name = name.toLowerCase();
          let id = data.eventID;
          if (id.includes(search) || name.includes(search.toLowerCase())) {
            setEvents((prev) => [...prev, data]);
          }
        }
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
      <SearchBar
        placeholder="Search Event Name or ID"
        onChangeText={debouncedResults}
        style={styles.searchBar}
        placeholderTextColor={
          darkModeEnabled ? darkTheme.text : lightTheme.text
        }
        theme={darkModeEnabled ? "dark" : "light"}
        keyboardAppearance={darkModeEnabled ? "dark" : "light"}
      />
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
                  <Bookmark
                    handleAttend={handleAttend}
                    eventID={event.eventID}
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

export default FeedScreen;

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
    width: "90%",
  },
  eventContainer: {
    borderColor: darkTheme.pink,
    borderWidth: 2,
    margin: 20,
    height: 90,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderColor: darkTheme.pink,
    borderWidth: 2,
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
    marginBottom: 55,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "70%",
  },
  buttonClose: {
    backgroundColor: darkTheme.pink,
    marginTop: "0%",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 40,
  },
  modalBody: {
    fontWeight: "bold",
    margin: 15,
    fontSize: 15,
  },
  modalBodyContainer: {
    width: "100%",
    backgroundColor: darkTheme.background,
    borderRadius: 15,
  },
  buttonMap: {
    backgroundColor: darkTheme.purple,
    width: "70%",
    marginTop: "10%",
    marginBottom: "5%",
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
  clipboard: {
    height: 20,
    width: 20,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});
