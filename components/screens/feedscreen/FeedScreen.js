import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import colours from "../../../theme/colours";
import NavGradient from "../../NavGradient";
import { Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import SelectableChips from "react-native-chip/SelectableChips";
import { firestore } from "../../../firebase/firestore";

const FeedScreen = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    firebase
      .firestore()
      .collection("events")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          console.log(data);
        });
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
      <ScrollView style={styles.scrollView}>
        {events.map((event) => {
          return (
            <View style={styles.eventContainer} key={event.key}>
              <Text style={styles.eventName}>{event.eventName}</Text>
            </View>
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
  },
  eventName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
  },
  scrollView: {
    width: "100%",
    marginBottom: 100,
  },
});
