import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './components/screens/Register/RegisterScreen';
import TempHome from './components/screens/Register/TempHome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={TempHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
