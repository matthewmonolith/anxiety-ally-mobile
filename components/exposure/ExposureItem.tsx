import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Colours } from "utils/Colours";

const ExposureItem = ({ title, date }) => {
  const { width, height } = useWindowDimensions();

  return (
    <TouchableOpacity style={styles.exposureItem}>
      <View style={styles.exposureTextContainer}>
        <Text style={styles.exposureText}>{title}</Text>
        <Text style={styles.exposureText}>({date})</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ExposureItem;

const styles = StyleSheet.create({
  exposureItem: {
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colours.baseOrange,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  exposureTextContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exposureText: {
    color: "white",
    fontSize: 18,
  },
});
