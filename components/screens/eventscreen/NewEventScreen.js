import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  View,
  Pressable,
} from "react-native";
import { firestore } from "../../../firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { LogBox } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { showMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "../../../node_modules/@react-navigation/core";
import NavGradient from "../../NavGradient";

LogBox.ignoreLogs(["Setting a timer"]);

const NewEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [dateText, setDateText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [changingTime, setChangingTime] = useState(false);
  const [changingDate, setChangingDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const validSports = [
    { label: "Basketball", sport: "Basketball" },
    { label: "Football", sport: "Football" },
    { label: "Cricket", sport: "Cricket" },
    { label: "Rugby", sport: "Rugby" },
    { label: "Waterpolo", sport: "Waterpolo" },
    { label: "Tennis", sport: "Tennis" },
    { label: "eSports", sport: "eSports" },
    { label: "Sailing", sport: "Sailing" },
  ];

  const navigation = useNavigation();
  const GOOGLE_PLACES_API_KEY = "AIzaSyDQVhiJCPkDE4AljpBO3fJINMQSLHsm0VU";

  const handlePublish = () => {
    if (
      eventName.length == 0 ||
      sport.length == 0 ||
      location.length == 0 ||
      dateText.length == 0 ||
      timeText.length == 0
    ) {
      showMessage({
        message: "Please fill out all fields before publishing",
        type: "danger",
        hideStatusBar: true,
      });
    } else {
      addEvent();
    }
  };

  const addEvent = () => {
    firestore
      .collection("events")
      .add({
        eventName: eventName,
        eventID: uuid(),
        date: dateText,
        time: timeText,
        sport: sport,
        location: location,
        long: long,
        lat: lat,
      })
      .then(function (docRef) {
        showMessage({
          message: "Event added!",
          type: "success",
          hideStatusBar: true,
        });
      })
      .then(() => {
        navigation.navigate("TempEvent");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        showMessage({
          message: "ERROR adding event",
          type: "danger",
          hideStatusBar: true,
        });
      });
  };

  const newDate = (currentMode) => {
    setChangingDate(true);
    setChangingTime(false);
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
    setMode(currentMode);
    if (Platform.OS === "ios") {
      setModalVisible(true);
    }
  };

  const newTime = (currentMode) => {
    setChangingTime(true);
    setChangingDate(false);
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
    setMode(currentMode);
    if (Platform.OS === "ios") {
      setModalVisible(true);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    if (changingDate) {
      let fDate =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      setDateText(fDate);
    }

    if (changingTime) {
      let fTime =
        tempDate.getHours() +
        ":" +
        (tempDate.getMinutes() > 9
          ? tempDate.getMinutes()
          : "0" + tempDate.getMinutes());

      setTimeText(fTime);
    }
    setShow(false);
  };

  const handleLocation = (data, lat, long) => {
    setLocation(data.description);
    setLong(long);
    setLat(lat);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>New Event</Text>
      </View>

      <TextInput
        style={styles.text}
        value={eventName}
        onChangeText={(text) => setEventName(text)}
        placeholder="Event Name"
      />

      <Dropdown
        style={styles.text}
        data={validSports}
        search
        maxHeight={300}
        labelField="label"
        valueField="sport"
        placeholder="Sport"
        placeholderStyle={{ color: "#BEBEBE", fontSize: 14 }}
        selectedTextStyle={{ color: "black", fontSize: 13 }}
        searchPlaceholder="Search..."
        value={sport}
        onChange={(item) => {
          setSport(item.sport);
        }}
        dropdownPosition={"bottom"}
      />

      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true}
        placeholder="Location"
        minLength={2}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
          components: "country:nz",
        }}
        onPress={(data, details = null) =>
          handleLocation(
            data,
            details.geometry.location.lat,
            details.geometry.location.lng
          )
        }
        onFail={(error) => console.error(error)}
        enablePoweredByContainer={false}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "white",
            width: "90%",
            borderRadius: 10,
            marginBottom: "5%",
            height: 50,
          },
          textInput: {
            height: 46,
            color: "black",
            fontSize: 14,
          },
          listView: {
            width: "95%",
            paddingLeft: 10,
          },
        }}
      />

      <TouchableOpacity
        onPress={() => newDate("date")}
        style={styles.datePicker}
      >
        <Text style={styles.pickerText}>Date: {dateText}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => newTime("time")}
        style={styles.timePicker}
      >
        <Text style={styles.pickerText}>Time: {timeText}</Text>
      </TouchableOpacity>

      {show &&
        (Platform.OS === "ios" ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <RNDateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  minimumDate={new Date()}
                  style={{
                    width: "90%",
                    backgroundColor: "black",
                    marginTop: 10,
                  }}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChange}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setShow(false);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : (
          <RNDateTimePicker
            testID="dateTimePicker"
            minimumDate={new Date()}
            value={date}
            mode={mode}
            style={{
              width: "90%",
              backgroundColor: "black",
              marginTop: 10,
            }}
            onChange={onChange}
          />
        ))}

      <TouchableOpacity style={styles.button} onPress={handlePublish}>
        <Text style={styles.buttonText}>Publish Event</Text>
      </TouchableOpacity>
      <NavGradient />
    </KeyboardAvoidingView>
  );
};

export default NewEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  titleContainer: {
    width: "100%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    marginLeft: "5%",
    marginTop: "20%",
    marginBottom: "10%",
  },
  text: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    width: "90%",
    borderRadius: 10,
    marginBottom: "10%",
    height: 50,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3F3D41",
    width: "90%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E82A96",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 25,
  },
  datePicker: {
    backgroundColor: "white",
    width: "90%",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
    marginTop: "5%",
    marginBottom: "10%",
  },
  pickerText: {
    color: "black",
  },
  timePicker: {
    backgroundColor: "white",
    width: "90%",
    height: 50,
    borderRadius: 15,
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1E1E1E",
    borderColor: "#E82A96",
    borderWidth: 2,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: "90%",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
