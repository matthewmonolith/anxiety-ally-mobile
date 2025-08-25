import SignUpForm from "components/auth/SignUpForm";
import { StyleSheet, Text, View } from "react-native";
const SignUp = () => {
  return (
    <View style={styles.container}>
      <SignUpForm />
    </View>
  );
};
export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
