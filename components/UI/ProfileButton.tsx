import { StyleSheet, TouchableOpacity, Image } from "react-native"

const ProfileButton = ({ onPress }: { onPress?: () => void }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: "https://placecats.com/neo/200/200" }}
        style={styles.avatar}
      />
    </TouchableOpacity>
  )
}

export default ProfileButton

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
})
