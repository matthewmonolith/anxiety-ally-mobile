import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signUpValidationSchema } from "schemas/signUpValidationSchema";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Colours } from "utils/Colours";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "components/UI/Input";

interface IFormInput {
  email: string;
  username: string;
  password: string;
}

const SignUpForm = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   console.log('called');

  //   console.log(data);
  //   const errorMessages = Object.values(errors)
  //     .map((err) => err?.message)
  //     .filter(Boolean) as string[];
  //   if (errorMessages.length > 0) {
  //     Alert.alert("Please try again", errorMessages.join("\n"), [
  //       { text: "OK", style: "default" },
  //     ]);
  //   }
  // };

  const onValid: SubmitHandler<IFormInput> = (data) => console.log(data);

  const onInvalid = (errors: FieldErrors<IFormInput>) => {
    const errorMessages = Object.values(errors)
      .map((e) => e?.message)
      .filter(Boolean) as string[];
    if (errorMessages.length) {
      Alert.alert("Please try again", errorMessages.join("\n"), [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Create an account</Text>

      <Input<IFormInput>
        control={control}
        name="username"
        iconName="person-outline"
        placeholder="Username"
      />

      <Input<IFormInput>
        control={control}
        name="email"
        iconName="mail-outline"
        placeholder="Email"
        keyboardType="email-address"
      />

      <Input<IFormInput>
        control={control}
        name="password"
        iconName="lock-closed-outline"
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit(onValid, onInvalid)();
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp" as never)}>
        <Text style={styles.signUp}>
          Already have an account? <Text style={styles.signUpLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: "bold",
    color: Colours.baseBlue,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: Colours.baseGreen,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  signUp: {
    color: "#000",
  },
  signUpLink: {
    color: "#1E90FF",
  },
});
