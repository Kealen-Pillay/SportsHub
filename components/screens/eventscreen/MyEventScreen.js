import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  LogBox,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import NavGradient from "../../NavGradient";
import { darkTheme, lightTheme } from "../../../theme/themes";
import { firestore } from "../../../firebase/firestore";
import getDirections from "react-native-google-maps-directions";
import colours from "../../../theme/colours";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { auth } from "../../../firebase/firebase";

/**
 * 
 * TODO
 * 
 * if events.size ==0 => display text "no events, please join or create one"
 */


const MyEventScreen = ({ darkModeEnabled }) => {

  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const currentUser = auth.currentUser?.email;

  useEffect(() => {
    setEvents([]);
    getEvents();
  }, [isFocused]);

  const getEvents = () => {
    firestore
      .collection("events")
      .where("attendees", "array-contains", currentUser)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          setEvents((prev) => [...prev, data]);
        });
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
    navigation.navigate("CreateEvent");
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
        <Text style={styles.title}>My Events</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.createText}>+</Text>
        </TouchableOpacity>
      </View>
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
              <Text style={styles.modalText}>{currentEvent.eventName}</Text>
              <View style={styles.modalBodyContainer}>
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
                <Text style={styles.textStyle}>Open Maps</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
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
              <View style={styles.eventContainer}>
                {renderBall(event.sport)}
                <View style={styles.infoContainer}>
                  <Text style={styles.eventName}>{event.eventName}</Text>
                  <Text style={styles.eventDate}>
                    {event.date} - {event.time}
                  </Text>
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

export default MyEventScreen;

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    marginLeft: "5%",
    marginTop: "20%",
    marginBottom: "10%",
  },
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
    marginTop: 0,
    width: "70%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
  },
  modalBody: {
    color: "white",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  modalBodyContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colours.backgroundDark,
    borderRadius: 15,
  },
  maps: {
    backgroundColor: colours.purple,
    width: "70%",
    marginTop: 20,
    marginBottom: 10,
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: colours.lightGrey,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginLeft: "5%",
    marginTop: "20%",
    marginBottom: "10%",
    borderColor: colours.pink,
    borderWidth: 2,
  },
  createText: {
    color: colours.text,
    fontWeight: "bold",
    fontSize: 30,
    bottom: 6,
    right: 0.5,
  },
});
