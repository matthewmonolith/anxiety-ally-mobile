import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import IconButton from "./IconButton";
import { Colours } from "utils/Colours";

const ActionCard = ({
  actionText,
}: {
  actionText: string;
}) => {
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity style={styles.actionCard}>
      <View>
        <IconButton iconName="add-outline" size={25} color="white" />
      </View>
      <Text style={styles.actionText}>{actionText}</Text>
    </TouchableOpacity>
  );
};
export default ActionCard;
const styles = StyleSheet.create({
  actionCard: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colours.baseBlue,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10
  },
  actionText: {
    color: 'white',
    fontSize: 18
  },
});
