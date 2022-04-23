import { StyleSheet, View } from 'react-native';
import MainContainer from './components/NavBar';
import LoginScreen from './components/screens/loginscreen/LoginScreen';
import ProfileScreen from './components/screens/profilescreen/ProfileScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen/> */}
      {/* <ProfileScreen/> */}
      <MainContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
