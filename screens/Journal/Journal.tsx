import { ScrollView } from "react-native-gesture-handler";
import ActionCard from "components/UI/ActionCard";

const Journal = ({ navigation }) => {
  return (
    <ScrollView>
      <ActionCard
        image={require("../../assets/Images/journal.png")}
        title="Journal For Your Thoughts"
        onPress={() => navigation.navigate("Thoughts")}
      />
      <ActionCard
        image={require("../../assets/Images/self-compassion.png")}
        title="Self Compassion Journal"
      />
    </ScrollView>
  );
};
export default Journal;
