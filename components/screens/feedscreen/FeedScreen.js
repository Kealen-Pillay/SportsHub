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
} from "react-native";
import React from "react";
import colours from "../../../theme/colours";
import NavGradient from "../../NavGradient";
import { Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import SelectableChips from "react-native-chip/SelectableChips";
import { firestore } from "../../../firebase/firestore";
import Dialog from "react-native-dialog";

LogBox.ignoreLogs(["Setting a timer"]);

const FeedScreen = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

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
        return <Image
          style={styles.ball}
          source={require("../../../images/Basketball.png")}
        />;
      case "Volleyball":
        return <Image
          style={styles.ball}
          source={require("../../../images/Volleyball.png")}
        />;
      case "Football":
        return <Image
          style={styles.ball}
          source={require("../../../images/Football.png")}
        />;
      default:
    }
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
        }}
        chipStyle={{
          borderColor: "black",
          backgroundColor: colours.lightGrey,
          borderWidth: 2,
          width: 110,
          marginTop: 20,
          marginBottom: 10,
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
              <Pressable style={[styles.button, styles.maps]}>
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
              }}
            >
              <View style={styles.eventContainer}>
                {renderBall(event.sport)}
                <View style={styles.infoContainer}>
                  <Text style={styles.eventName}>{event.eventName}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
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
    height: "64%",
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
    marginTop: 10,
    width: "70%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 30,
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
    marginTop: 30,
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
});
