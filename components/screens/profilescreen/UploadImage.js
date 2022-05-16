import React, { useEffect, useState } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { darkTheme, lightTheme } from "../../../theme/themes";
import { firestore } from "../../../firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { auth } from "../../../firebase/firebase";

export default function UploadImage({ darkModeEnabled, image, setImage }) {

  useEffect(() => {}, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.cancelled) {
      firestore
        .collection("users")
        .doc(auth.currentUser?.email)
        .update(
          {
            profileimg: _image.uri,
          },
          setImage(_image.uri)
        )
        .then(() => {
          showMessage({
            message: "Profile Image Uploaded!",
            type: "success",
            hideStatusBar: true,
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkModeEnabled
            ? darkTheme.background
            : lightTheme.background,
          borderColor: darkModeEnabled ? darkTheme.pink : lightTheme.pink,
        },
      ]}
    >
      {image && (
        <Image source={{ uri: image }} style={{ width: 130, height: 130 }} />
      )}

      <View
        style={[
          styles.uploadButtonContainer,
          {
            backgroundColor: darkModeEnabled
              ? darkTheme.cardBackground
              : lightTheme.cardBackground,
          },
        ]}
      >
        <TouchableOpacity onPress={addImage} style={styles.uploadButton}>
          <Text
            style={{
              color: darkModeEnabled ? darkTheme.text : lightTheme.text,
            }}
          >
            {image ? "Edit" : "Upload"} Image
          </Text>
          <AntDesign
            style={{
              color: darkModeEnabled ? darkTheme.text : lightTheme.text,
            }}
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
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    marginTop: 10,
  },
  uploadButtonContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "100%",
    height: "30%",
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
