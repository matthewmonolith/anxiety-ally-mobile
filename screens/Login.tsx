import LoginForm from 'components/LoginForm'
import { StyleSheet, Text, View } from 'react-native'
const Login = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  )
}
export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})