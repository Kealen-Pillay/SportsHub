import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeedScreen from "./screens/feedscreen/FeedScreen";
import MyEventScreen from "./screens/eventscreen/MyEventScreen";
import ProfileScreen from "./screens/profilescreen/ProfileScreen";
import { useState } from "react";
import { LogBox } from "react-native";
import MyEventsTab from "./screens/eventscreen/MyEventsTab";

LogBox.ignoreLogs(["Setting a timer"]);

const feedScreen = "Feed";
const eventScreen = "Events";
const profileScreen = "Profile";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [newEventShow, setNewEventShow] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName={feedScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === eventScreen) {
            iconName = focused ? "list" : "list-outline";
          } else if (routeName === feedScreen) {
            iconName = focused ? "map" : "map-outline";
          } else if (routeName === profileScreen) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={40}
              color={color}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 60,
                height: "170%",
              }}
            />
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          left: 10,
          right: 10,
          borderRadius: 15,
          backgroundColor: "transparent",
          height: 65,
          borderTopWidth: 0,
          elevation: 0,
        },
      })}
    >
      <Tab.Screen name={eventScreen}>
        {() => (
          <MyEventsTab
            darkModeEnabled={darkModeEnabled}
            newEventShow={newEventShow}
            setNewEventShow={setNewEventShow}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name={feedScreen}>
        {() => <FeedScreen darkModeEnabled={darkModeEnabled} />}
      </Tab.Screen>
      <Tab.Screen name={profileScreen}>
        {() => <ProfileScreen setDarkModeEnabled={setDarkModeEnabled} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default NavBar;
