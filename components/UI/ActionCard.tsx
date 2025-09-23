import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native";

type FeatureCardProps = {
  image: any;
  title: string;
  onPress?: () => void;
};

const ActionCard = ({ image, title, onPress }: FeatureCardProps) => {
  return (
    <Card style={{ margin: 10 }}>
      <TouchableOpacity onPress={onPress}>
        <Card.Cover source={image} />
        <Card.Title title={title} style={{minHeight: 60}}/>
      </TouchableOpacity>
    </Card>
  );
};

export default ActionCard;
