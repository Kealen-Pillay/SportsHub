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
// import getDirections from "react-native-google-maps-directions";
import colours from "../../../theme/colours";
import { useNavigation } from "@react-navigation/native";

/**
 * TODO
 * Refresh after create event
 * only show current user's event
 * 
 */


const MyEventScreen = ({ darkModeEnabled }) => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    getEvents();
  }, []);

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

  const handleCreateEvent = () => {

    navigation.navigate("CreateEvent");
  }
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
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.createText}>+</Text>
        </TouchableOpacity>
      </View>
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
  titleContainer:{
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
