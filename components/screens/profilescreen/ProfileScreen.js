import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { darkTheme, lightTheme } from "../../../theme/themes";
import { Card, Switch } from "react-native-paper";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase/firebase";
import { firestore } from "../../../firebase/firestore";
import UploadImage from "./UploadImage";
import NavGradient from "../../NavGradient";
import Toast from "react-native-toast-message";

const ProfileScreen = ({ setDarkModeEnabled }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [defaultRating, setdefaultRating] = useState();
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const [username, setUsername] = useState("");
  const starImgFilled = require("../../../images/star_filled.png");
  const starImgCorner = require("../../../images/star_corner.png");
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser?.email)
      .get()
      .then((documentSnapshot) => {
        let data = documentSnapshot.data();
        setImage(data.profileimg);
      })
      .catch((error) => console.log(error));
  }, []);

  const RatingBox = () => {
    return (
      <View style={styles.customRatingBar}>
        {maxRating.map((rating, key) => {
          return (
            <TouchableOpacity activeOpacity={0.7} key={rating}>
              <Image
                style={styles.starImgStyle}
                source={rating <= defaultRating ? starImgFilled : starImgCorner}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const getRating = () => {
    firestore
      .collection("users")
      .where("email", "==", auth.currentUser?.email)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          {
            let rating = data.rating;
            setdefaultRating(rating);
          }
        });
      });
  };

  const getUsername = () => {
    firestore
      .collection("users")
      .where("email", "==", auth.currentUser?.email)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          {
            let name = data.username;
            setUsername(name);
          }
        });
      });
  };

  useEffect(() => {
    setDarkModeEnabled(isEnabled);
    getRating();
    getUsername();
  }, [isEnabled]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isEnabled
            ? darkTheme.background
            : lightTheme.background,
        },
      ]}
    >
      <View style={styles.usernameCardContainer}>
        <Card
          style={[
            styles.usernameCard,
            {
              backgroundColor: isEnabled
                ? darkTheme.cardBackground
                : lightTheme.cardBackground,
            },
          ]}
        >
          <View style={styles.imageContainer}>
            <UploadImage
              darkModeEnabled={isEnabled}
              image={image}
              setImage={setImage}
            />
            <Text
              style={[
                styles.usernameText,
                { color: isEnabled ? darkTheme.text : lightTheme.text },
              ]}
            >
              {username}
            </Text>
          </View>
        </Card>
        <Toast />
      </View>
      <View style={styles.ratingCardContainer}>
        <Card
          style={[
            styles.ratingCard,
            {
              backgroundColor: isEnabled
                ? darkTheme.cardBackground
                : lightTheme.cardBackground,
            },
          ]}
        >
          <View style={styles.ratingsInnerContainer}>
            <Text
              style={[
                styles.ratingText,
                { color: isEnabled ? darkTheme.text : lightTheme.text },
              ]}
            >
              Rating:
            </Text>
            <RatingBox />
          </View>
        </Card>
      </View>
      <View style={styles.darkModeCardContainer}>
        <Card
          style={[
            styles.darkModeCard,
            {
              backgroundColor: isEnabled
                ? darkTheme.cardBackground
                : lightTheme.cardBackground,
            },
          ]}
        >
          <View style={styles.darkModeInnerContainer}>
            <Text
              style={[
                styles.darkModeText,
                { color: isEnabled ? darkTheme.text : lightTheme.text },
              ]}
            >
              Dark Mode:
            </Text>
            <Switch
              color={darkTheme.pink}
              value={isEnabled}
              onValueChange={() => setIsEnabled(!isEnabled)}
            />
          </View>
        </Card>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <NavGradient />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButton: {
    backgroundColor: darkTheme.pink,
    height: 60,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 30,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  usernameCardContainer: {
    height: 200,
    width: "90%",
    marginBottom: 30,
    marginTop: 80,
  },
  usernameCard: {
    borderWidth: 2,
    borderRadius: 15,
    height: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: darkTheme.pink,
  },
  usernameText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 10,
  },
  ratingCard: {
    borderWidth: 2,
    borderRadius: 15,
    height: 80,
    alignItems: "flex-start",
    justifyContent: "center",
    borderColor: darkTheme.pink,
  },
  ratingCardContainer: {
    height: 80,
    width: "90%",
    marginBottom: 30,
  },
  darkModeCardContainer: {
    height: 80,
    width: "90%",
    marginBottom: 50,
  },
  darkModeCard: {
    borderWidth: 2,
    borderRadius: 15,
    height: 80,
    alignItems: "flex-start",
    borderColor: darkTheme.pink,
  },
  darkModeText: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: "5%",
    marginRight: "30%",
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 5,
    marginLeft: "5%",
    marginRight: "10%",
  },
  darkModeInnerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingsInnerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  starImgStyle: {
    width: 35,
    height: 35,
  },
  customRatingBar: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
