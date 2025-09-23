import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface routeParams {
  data: {
    id: number;
    title: string;
    date: string;
  };
}

const EditPhobiaExposure = ({ route }: { route: { params: routeParams } }) => {
  console.log(route.params);

  const { id, title, date } = route.params.data;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};
export default EditPhobiaExposure;
const styles = StyleSheet.create({});

//route: { params: { data: { title: string; date: string; id: string } }
