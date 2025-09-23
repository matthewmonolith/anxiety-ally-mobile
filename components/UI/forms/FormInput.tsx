import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { Colours } from "utils/Colours";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  labelText?: string;
  placeholderText?: string;
};

const FormInput = ({
  value,
  onChangeText,
  multiline,
  labelText,
  placeholderText,
}: Props) => {
  return (
    <View style={styles.section}>
      <View style={styles.inputWrapper}>
        {labelText && <Text style={styles.labelText}>{labelText}</Text>}
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          label={placeholderText}
          onChangeText={onChangeText}
          underlineColor={Colours.baseOrange}
          activeUnderlineColor={Colours.highlightBlue}
          multiline={multiline}
        />
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  section: { marginTop: 15 },
  inputWrapper: { alignItems: "center" },
  input: { width: "80%", marginTop: 15 },
  multiline: { minHeight: 120, textAlignVertical: "top" },
  labelText: {
    fontSize: 18,
    backgroundColor: Colours.baseOrange,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    marginTop: 15,
  },
});
