import ExposureItem from "components/exposure/ExposureItem";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { ListRenderItem } from "react-native";
import { Card } from "react-native-paper";
import ActionCard from "components/UI/ActionCard";

interface Exposure {
  id: string;
  title: string;
  date: string;
}

const Exposure = ({ navigation }) => {
  return (
    <View style={styles.exposure}>
      <ScrollView>
        <ActionCard image={require("../assets/Images/exposure-two.png")} title="Phobia Exposures" onPress={() => navigation.navigate("PhobiaExposures")}/>
        <ActionCard image={require("../assets/Images/social-exposure.png")} title="Social Anxiety Exposures"/>
      </ScrollView>
    </View>
  );
};
export default Exposure;
const styles = StyleSheet.create({
  exposure: {
    display: "flex",
    flex: 1,
  },
  exposureCard: {
    margin: 10,
  },
});
