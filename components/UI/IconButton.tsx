import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const IconButton = ({
  iconName,
  color,
  onPress,
  size = 25
}: {
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});

//https://stackoverflow.com/questions/72267427/react-native-expo-vector-icons-typescript-type-definition-for-icon-name
