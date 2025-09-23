import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colours } from "utils/Colours";

const AddActionButton = () => {
  return (
    <TouchableOpacity style={styles.iconActionContainer}>
      <Ionicons name="add-outline" size={45} color="white" />
    </TouchableOpacity>
  );
};
export default AddActionButton;
const styles = StyleSheet.create({
  iconActionContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colours.baseBlue,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
