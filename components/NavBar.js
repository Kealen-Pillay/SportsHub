import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeedScreen from "./screens/feedscreen/FeedScreen";
import MyEventScreen from "./screens/eventscreen/MyEventScreen";
import ProfileScreen from "./screens/profilescreen/ProfileScreen";
import { useState } from "react";

const feedScreen = "Feed";
const eventScreen = "Events";
const profileScreen = "Profile";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

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
              size={45}
              color={color}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 60,
                height: "130%",
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
          height: 90,
          borderTopWidth: 0,
          elevation: 0,
        },
      })}
    >
      <Tab.Screen name={eventScreen}>
        {() => <MyEventScreen darkModeEnabled={darkModeEnabled} />}
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
