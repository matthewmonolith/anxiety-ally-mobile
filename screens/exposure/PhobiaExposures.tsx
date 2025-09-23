import { SafeAreaView, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import type { ListRenderItem } from "react-native";
import ListItem from "components/UI/ListItem";
import { PLACEHOLDER_EXPOSURE_DATA } from "utils/placeholderData";
import { AnimatedFAB } from "react-native-paper";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Colours } from "utils/Colours";
import { StackRoutes } from "models";
import type { Exposure } from "models";

//TODO - set up a hook

type Nav = NativeStackNavigationProp<StackRoutes>;

const renderExposureItem: ListRenderItem<Exposure> = ({ item }) => {
  return (
    <ListItem
      title={
        item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title
      }
      date={item.date}
      key={item.id}
      id={item.id}
      navTo='EditPhobiaExposure'
    />
  );
};

const PhobiaExposures = () => {
  const [isExtended, setIsExtended] = useState(true);
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.phobiaExposures}>
      <FlatList
        renderItem={renderExposureItem}
        keyExtractor={(item) => item.id.toString()}
        data={PLACEHOLDER_EXPOSURE_DATA}
      />
      {/* TODO make as custom component */}
      <AnimatedFAB
        icon="plus"
        label="Add Exposure"
        extended={isExtended}
        onPress={() => navigation.navigate("CreatePhobiaExposure")}
        visible={true}
        animateFrom="right"
        iconMode="static"
        style={styles.fabStyle}
        color="white"
      />
    </SafeAreaView>
  );
};
export default PhobiaExposures;
const styles = StyleSheet.create({
  phobiaExposures: {
     marginBottom: 25,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
    backgroundColor: Colours.baseOrange,
  },
});
