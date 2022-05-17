import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { darkTheme, lightTheme } from "../../../theme/themes";
import { useState } from "react";
import { BlurView } from "expo-blur";
import { firestore } from "../../../firebase/firestore";
import { auth } from "../../../firebase/firebase";
import { showMessage } from "react-native-flash-message";

export default function UploadImage({ darkModeEnabled, image, setImage }) {
  const [modalVisible, setModalVisible] = useState(false);

  const addImage = (avatar) => {
    firestore
      .collection("users")
      .doc(auth.currentUser?.email)
      .update(
        {
          profileimg: avatar,
        },
        setImage(avatar)
      )
      .then(() => {
        showMessage({
          message: "Profile Picture Updated!",
          type: "success",
          hideStatusBar: true,
        });
        setModalVisible(false);
      })
      .catch((error) => console.log(error));
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
      <Image source={image} style={styles.profileImage} />
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
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.uploadButton}
        >
          <Text
            style={{
              color: darkModeEnabled ? darkTheme.text : lightTheme.text,
            }}
          >
            {image ? "Change" : "Choose"} Image
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
              <View style={styles.avatarContainer}>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/apple.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/apple.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/banana.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/banana.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/blueberry.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/blueberry.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.avatarContainer}>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/bubblegum.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/bubblegum.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/cherry.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/cherry.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/grape.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/grape.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.avatarContainer}>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/mango.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/mango.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/peach.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/peach.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    addImage(require("../../../avatar-icons/plum.png"))
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={require("../../../avatar-icons/plum.png")}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 130,
    width: 130,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
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
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: darkTheme.pink,
    marginTop: "0%",
  },
  avatar: {
    width: 80,
    height: 80,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "15%",
  },
  profileImage: {
    width: 130,
    height: 130,
  },
});
