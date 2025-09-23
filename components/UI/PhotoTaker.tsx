import {
  View,
  Button,
  Alert,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import IconButton from "./IconButton";
import { useState } from "react";
import { Colours } from "utils/Colours";

function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions(); //need this hook to get permissions on ios

  const [picture, setPicture] = useState(null);

  async function verifyPermissions() {
    if (
      cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ||
      cameraPermissionInformation.status === PermissionStatus.DENIED
    ) {
      const res = await requestPermission();

      if (!res.granted) {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant camera permissions to use this app."
        );
        return false;
      }

      return true;
    }

    return true;
  }

  async function takePictureHandler() {
    const res = await verifyPermissions();
    if (!res) {
      return;
    }
    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });  

    setPicture(result.assets[0].uri);
    onTakeImage(result.assets[0].uri);
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        <TouchableOpacity
          onPress={takePictureHandler}
          style={styles.imagePreviewButton}
        >
          <Text style={styles.imagePreviewButtonText}>Upload a picture</Text>
          <IconButton iconName="camera-outline" size={36} color="white" />
        </TouchableOpacity>
        <View style={styles.imagePreview}>
          {picture ? (
            <Image source={{ uri: picture }} style={styles.image} />
          ) : (
            <Text>No picture taken yet.</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.baseBlue,
    borderRadius: 4,
  },
  image: {
    width: "80%",
    height: 200,
  },
  imagePreviewButton: {
    fontSize: 18,
    backgroundColor: Colours.baseOrange,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  imagePreviewButtonText: {
    color: "white",
    fontSize: 18,
  },
});
