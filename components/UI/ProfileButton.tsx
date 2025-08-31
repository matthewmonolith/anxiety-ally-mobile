import { StyleSheet, TouchableOpacity, Image } from "react-native";

const ProfileButton = ({
  onPress,
  main = false,
}: {
  onPress?: () => void;
  main?: boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{marginRight: main ? 0 : 12}}>
      <Image
        source={{ uri: "https://placecats.com/neo/200/200" }}
        style={{
          width: main ? 72 : 36,
          height: main ? 72 : 36,
          borderRadius: main ? 32 : 18,
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  container: {
    // marginRight: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
