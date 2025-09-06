import ExposureItem from "components/exposure/ExposureItem";
import ActionCard from "components/UI/ActionCard";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import type { ListRenderItem } from "react-native";

interface Exposure {
  id: string;
  title: string;
  date: string;
}

const PLACEHOLDER_DATA: Exposure[] = [
  {
    id: Number(Math.random() * 1000).toFixed(0),
    title: "First exposure!",
    date: new Date().toDateString(),
  },
];

const renderExposureItem: ListRenderItem<Exposure> = ({ item }) => (
  <ExposureItem title={item.title} date={item.date} />
);

const Exposure = ({ navigation }) => {
  console.log(PLACEHOLDER_DATA[0].title);

  return (
    <View>
      <ActionCard actionText="Create New Exposure" />
      <FlatList
        data={PLACEHOLDER_DATA}
        keyExtractor={(exposure) => exposure.id.toString()}
        renderItem={renderExposureItem}
        style={styles.exposureList}
      />
    </View>
  );
};
export default Exposure;
const styles = StyleSheet.create({
  exposureList: {
    marginTop: 10
  }
});
