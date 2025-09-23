import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colours } from "utils/Colours";
import type { StackRoutes } from "models";

const ListItem = ({
  title,
  date,
  id,
  navTo,
}: {
  title: string;
  date: string;
  id: number;
  navTo?: string;
}) => {
  const { width, height } = useWindowDimensions();

  type Nav = NativeStackNavigationProp<StackRoutes>;

  const navigation = useNavigation<Nav>();

  const handlePress = () => {
    if (navTo) {
      navigation.navigate(navTo, {
        data: { id, title, date },
      });
    }

    return null;
  };

  return (
    <TouchableOpacity style={styles.exposureItem} onPress={handlePress}>
      <View style={styles.exposureTextContainer}>
        <Text style={styles.exposureText}>{title}</Text>
        <Text style={styles.exposureText}>({date})</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ListItem;

const styles = StyleSheet.create({
  exposureItem: {
    marginHorizontal: 10,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colours.baseBlue,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  exposureTextContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exposureText: {
    color: "white",
    fontSize: 18,
  },
});
