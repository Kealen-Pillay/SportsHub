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
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { auth } from "../../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { firestore } from "../../../firebase/firestore";


/**
 * TO DO:
 * 
 * -make team id's human readable so easier to reference
 * -add nested collection called "chat" or similar in a team document when it is first created
 * -finish message add to db in onSend()
 * -useLayoutEffect to display message in most recent createdAt order
 * -Link chatroom page to team page
 */


const ChatScreen = ({ darkModeEnabled }) => {
  const [messages, setMessages] = useState([]);
  
  const [senderName, setSenderName] = useState(null);
  const [senderAvatar, setSenderAvatar] = useState(null);

  useEffect(() => {
    // creates message object
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
    getSenderInfo();
  }, []);


  const getSenderInfo = () => {
    firestore
      .collection("users")
      .where("email", "==", auth.currentUser?.email)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((snapshot) => {
          let data = snapshot.data();
          {
            let senderName = data.username;
            let senderAvatar = data.profileimg;
            setSenderName(senderName);
            setSenderAvatar(senderAvatar);
          }
        });
      });
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages));
      const {
        _id,
        createdAt,
        text,
        user,
      }=messages[0]
      firestore.collection("teams").doc("TEAM ID GOES HERE").collection("chat")// navigate to nested chat collection and add message object to document
    
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
          CHATROOM
        </Text>
      </View>

      <View style={styles.chatContainer}>
      
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderInputToolbar={(props) => customtInputToolbar(props)}
          
        user={{ 
            
            // _id: uuid(), uncommenting this makes all bubbles same color
            user: {senderName},
            avatar: {senderAvatar},
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
  },
  titleContainer: {
    alignItems: "center",
    width: "95%",
    borderWidth: 2,
    borderColor: darkTheme.pink,
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
  },

  chatContainer: {
    flex: 1,
    marginBottom: 100,
  },
});