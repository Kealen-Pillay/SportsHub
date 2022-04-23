import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colours from "../../../theme/colours";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const addImage = () => {};

  return (
    <View style={styles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadButton}>
          <Text style={styles.buttonText}>
            {image ? "Edit" : "Upload"} Image
          </Text>
          <AntDesign
            style={styles.buttonImage}
            name="camera"
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 130,
    width: 130,
    backgroundColor: colours.backgroundDark,
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colours.pink,
    marginTop: 10,
  },
  uploadButtonContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: colours.lightGrey,
    width: "100%",
    height: "30%",
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colours.text,
  },
  buttonImage: {
    color: colours.text,
  },
});
