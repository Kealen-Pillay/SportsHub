import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import colours from "../theme/colours";

const NavGradient = () => {
  return (
    <LinearGradient
      colors={[colours.purple, colours.pink]}
      style={styles.linearGradient}
    />
  );
};

export default NavGradient;

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    borderRadius: 15,
    height: 90,
    borderTopWidth: 0,
  },
});
