import { StyleSheet, Text, View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import type { KeyboardTypeOptions } from "react-native";

type InputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  iconName?: keyof typeof Ionicons.glyphMap;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  secureTextEntry?: boolean;
  showError?: boolean
};

const Input = <T extends FieldValues>({
  control,
  name,
  iconName,
  keyboardType,
  placeholder,
  secureTextEntry,
  showError = false
}: InputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View
          style={[
            styles.inputContainer,
            !!error && { borderColor: "red", borderWidth: 1 },
          ]}
        >
          {iconName && <Ionicons name={iconName} size={25} style={[styles.icon, !!error && {color: 'red'}]} />}
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType ?? "default"}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={(value as string) ?? ""}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={error ? "red" : "#888"}
          />
          {showError && !!error?.message && (
            <Text numberOfLines={1} style={styles.errorText}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: "100%" },
  errorText: {
    color: "red",
    marginLeft: 8,
    maxWidth: "40%",
  },
});
