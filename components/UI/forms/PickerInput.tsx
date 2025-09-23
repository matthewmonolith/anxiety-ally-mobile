import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colours } from "utils/Colours";

type Props<T extends string | number> = {
  label: string;
  selectedValue: T;
  onValueChange: (value: T) => void;
  items: { label: string; value: T }[];
};

const PickerInput = <T extends string | number>({
  label,
  selectedValue,
  onValueChange,
  items,
}: Props<T>) => {
  return (
    <View style={styles.section}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
            {items.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default PickerInput;

const styles = StyleSheet.create({
  section: { marginTop: 15 },
  wrapper: { alignItems: "center" },
  label: {
    fontSize: 18,
    backgroundColor: Colours.baseOrange,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    marginTop: 15,
  },
  pickerContainer: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "#e7e0ec",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
