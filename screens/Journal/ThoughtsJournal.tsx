import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import type { ListRenderItem } from "react-native";
import ListItem from "components/UI/ListItem";
import { AnimatedFAB } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colours } from "utils/Colours";
import type { Item } from "models";
import { PLACEHOLDER_DATA } from "utils/placeholderData";

type StackRoutes = {
  CreateJournal: undefined;
};

type Nav = NativeStackNavigationProp<StackRoutes>;

const renderItem: ListRenderItem<Item> = ({ item }) => {
  return (
    <ListItem
      title={
        item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title
      }
      date={item.date}
      id={item.id}
      key={item.id}
    />
  );
};

const ThoughtsJournal = () => {
  const [isExtended, setIsExtended] = useState(true);
  const navigation = useNavigation<Nav>();

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <SafeAreaView style={styles.thoughtsJournal}>
      <FlatList
        data={PLACEHOLDER_DATA}
        keyExtractor={(exposure) => exposure.id.toString()}
        renderItem={renderItem}
        onScroll={onScroll}
      />
      <AnimatedFAB
        icon="plus"
        label="Add Journal  "
        extended={isExtended}
        onPress={() => navigation.navigate("CreateJournal")}
        visible={true}
        animateFrom="right"
        iconMode="static"
        style={styles.fabStyle}
        color="white"
      />
    </SafeAreaView>
  );
};
export default ThoughtsJournal;
const styles = StyleSheet.create({
  thoughtsJournal: {
    marginBottom: 25,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
    backgroundColor: Colours.baseOrange,
  },
});
