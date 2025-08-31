import { StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'

const BackNavButton = () => {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 20,
        padding: 6,
      }}
    >
      <Ionicons name="chevron-back" size={20} color="#000" />
    </View>
  );
};
export default BackNavButton;
const styles = StyleSheet.create({});
