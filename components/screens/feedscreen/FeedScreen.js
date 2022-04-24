import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import colours from "../../../theme/colours";
import NavGradient from "../../NavGradient";
import { Searchbar } from "react-native-paper";
import { useState } from "react";
import SelectableChips from "react-native-chip/SelectableChips";

const FeedScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => setSearch(text)}
        value={search}
        style={styles.searchBar}
      />
      <View styles={styles.chipContainer}>
        <SelectableChips
          initialChips={["Football", "Basketball", "Volleyball"]}
          alertRequired={false}
          valueStyle={{
            color: "white"
          }}
          chipStyle={{
            borderColor: "black",
            backgroundColor: colours.lightGrey,
            borderWidth:2,
            width: 110,
            marginTop: 20,
          }}
          chipStyleSelected={{
            backgroundColor: colours.pink,
            borderColor: "black",
            borderWidth:2,
          }}
        />
      </View>
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
  chipContainer: {
    marginTop: 30,
  }
});
