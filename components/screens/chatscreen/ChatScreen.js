import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { darkTheme, lightTheme } from "../../../theme/themes";
import React from "react";
import NavGradient from "../../NavGradient";
import { useState, useCallback, useEffect } from "react";
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import { auth } from "../../../firebase/firebase";
import { firestore } from "../../../firebase/firestore";
import { v4 as uuid } from "uuid";

const ChatScreen = ({ darkModeEnabled }) => {
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState(null);
  const [senderAvatar, setSenderAvatar] = useState(null);

  useEffect(() => {
    getSenderInfo();
    const unsubscribe = firestore
      .collection("chat")
      .orderBy("createdAt", "desc")
      .limit(20)
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  }, []);

  const getSenderInfo = () => {
    firestore
      .collection("users")
      .where("email", "==", auth.currentUser?.email)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          let senderName = data.username;
          let senderAvatar = data.profileimg;
          setSenderName(senderName);
          setSenderAvatar(senderAvatar);
        });
      })
      .catch((error) => console.log(error));
  };

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user } = messages[0];
    firestore.collection("chat").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          borderRadius: 10,
          padding: 1,
        }}
      />
    );
  };




  const customBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: darkTheme.pink,
            borderRadius: 10,
          },
          left: {
            backgroundColor: darkTheme.purple,
            borderRadius: 10,

            
          },
        }}
        textStyle={{
          left: {
            color: "white",
          }
        }}
      />
    );
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
        <Text
          style={[
            styles.title,
            { color: darkModeEnabled ? darkTheme.text : lightTheme.text },
          ]}
        >
          Public Chat
        </Text>
      </View>
      <View style={styles.chatContainer}>
        <GiftedChat
          _id={uuid()}
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={(messages) => onSend(messages)}
          renderInputToolbar={(props) => customtInputToolbar(props)}
          renderBubble = {(props) => customBubble(props)}
          user={{
            _id: auth?.currentUser?.email,
            user: senderName,
            avatar: senderAvatar,
          }}
        />
        {Platform.OS === "android" && <KeyboardAvoidingView />}
      </View>
      <NavGradient />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    width: "95%",
    borderWidth: 2,
    borderColor: darkTheme.pink,
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 45,
  },
  chatContainer: {
    height: "80%",
    width: "95%",
    marginTop: "5%",
  },
});
