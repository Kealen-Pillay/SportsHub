import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { darkTheme } from "../theme/themes";

const NavGradient = () => {
  return (
    <LinearGradient
      colors={[darkTheme.purple, darkTheme.pink]}
      style={styles.linearGradient}
    />
  );
};

export default NavGradient;

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    bottom: 25,
    left: 10,
    right: 10,
    borderRadius: 15,
    height: 65,
    borderTopWidth: 0,
  },
});
