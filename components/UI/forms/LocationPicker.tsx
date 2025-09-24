import { StyleSheet, Text, View } from "react-native";
import MapboxGl from '@rnmapbox/maps'

const LocationPicker = () => {
  return (
    <View style={styles.container}>
      <MapboxGl.MapView></MapboxGl.MapView>
    </View>
  );
};
export default LocationPicker;
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});