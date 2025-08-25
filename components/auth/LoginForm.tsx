import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginValidationSchema } from "schemas/loginValidationSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { Colours } from "utils/Colours";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "components/UI/Input";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: { email: "", password: "" },
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Anxiety Ally</Text>

      <Input<IFormInput>
        control={control}
        name="email"
        iconName="mail-outline"
        placeholder="Email"
        keyboardType="email-address"
        showError
      />

      <Input<IFormInput>
        control={control}
        name="password"
        iconName="lock-closed-outline"
        placeholder="Password"
        secureTextEntry
        showError
      />


      <TouchableOpacity onPress={() => navigation.navigate("Forget" as never)}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp" as never)}>
        <Text style={styles.signUp}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000",
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
