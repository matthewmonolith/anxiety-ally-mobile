import ActionCard from "components/UI/ActionCard";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const Community = () => {
  return (
    <ScrollView>
      <ActionCard
        title="Community Posts"
        image={require("../assets/Images/posts.png")}
      />
      <ActionCard
        title="Meditations & Resources"
        image={require("../assets/Images/meditation.png")}
      />
    </ScrollView>
  );
};
export default Community;
