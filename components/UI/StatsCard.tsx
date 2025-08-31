import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const StatsCard = ({
  iconName,
  colour,
  count,
  subTitle,
  iconSize
}: {
  iconName?: keyof typeof Ionicons.glyphMap;
  colour: string;
  count: number;
  subTitle: string;
  iconSize?: number
}) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.cardContainer}>
      {iconName && <Ionicons name={iconName} size={iconSize || 25} color={colour} style={styles.icon}/>}
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};
export default StatsCard;
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: 120
  },
  count: {
    fontWeight: 'bold',
    fontSize: 18
  },
  subTitle: {
    textAlign: 'center'
  },
  icon: {
    marginBottom: 2,
    marginTop: 3
  }
});
