import { View, Button, StyleSheet, Alert, Image, Text } from "react-native";
import { Colours } from "utils/Colours";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
// import getMapPreview, { getAddress } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
  RouteProp,
} from "@react-navigation/native";
import { StackRoutes } from "models";

type LocationPickerRouteProp = RouteProp<StackRoutes, "LocationPicker">;

interface Location {
  lat: number;
  lng: number;
}

function LocationPicker({ onPickLocation }) {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute<LocationPickerRouteProp>();

  const [location, setLocation] = useState<Location | undefined>();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.lat,
        lng: route.params.lng,
      };
      setLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (location) {
        const address = getAddress(
          mapPickedLocation.lat,
          mapPickedLocation.lng
        );
        onPickLocation(...mapPickedLocation, address);
      }
    }

    handleLocation();
    onPickLocation(mapPickedLocation);
  }, [mapPickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED ||
      locationPermissionInformation.status === PermissionStatus.DENIED
    ) {
      const res = await requestPermission();

      if (!res.granted) {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant location permissions to use this app."
        );
        return false;
      }

      return true;
    }

    return true;
  }

  async function getLocationHandler() {
    const res = await verifyPermissions();

    if (!res) {
      return;
    }

    const location = await getCurrentPositionAsync(); //can pass config object as param

    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {location ? (
          <Image
            style={styles.mapImage}
            source={{ uri: getMapPreview(location.lat, location.lng) }}
          />
        ) : (
          <Text>No location picked yet!</Text>
        )}
      </View>
      <View style={styles.mapActions}>
        <Button
          title="Locate"
          onPress={getLocationHandler}
          style={styles.actionButton}
        />
        <Button
          title="Pick on map"
          onPress={pickOnMapHandler}
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}
export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.baseBlue,
    borderRadius: 4,
  },
  mapActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionButton: {
    width: "50%",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
