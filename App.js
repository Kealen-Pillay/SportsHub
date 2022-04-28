import { StyleSheet } from "react-native";
import LoginScreen from "./components/screens/loginscreen/LoginScreen";
import colours from "./theme/colours";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "./components/NavBar";
import RegisterScreen from "./components/screens/registerscreen/RegisterScreen";
import FlashMessage from "react-native-flash-message";
import NewEventScreen from "./components/screens/eventscreen/NewEventScreen";
import MyEventScreen from "./components/screens/eventscreen/MyEventScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateEvent"
          component={NewEventScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyEventScreen"
          component={MyEventScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Dashboard"
          component={NavBar}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.backgroundDark,
  },
});
