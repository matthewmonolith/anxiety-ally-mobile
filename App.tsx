import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "./screens/auth/Login";
import About from "screens/About";
import { Colours } from "utils/Colours";
import Profile from "screens/Profile";
import Journal from "screens/Journal";
import Exposure from "screens/Exposure";
import Community from "screens/Community";
import SignUp from "screens/auth/SignUp";
import { store, useFetchUserQuery } from "store";
import { useState } from "react";
import { Provider, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileButton from "components/UI/ProfileButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      id="rootTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
        tabBarStyle: { backgroundColor: Colours.baseBlue },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Profile: "person-circle",
            Journal: "book",
            Exposure: "leaf",
            Community: "people",
          };
          return (
            <Ionicons
              name={icons[route.name]}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Exposure" component={Exposure} />
      <Tab.Screen name="Community" component={Community} />
    </Tab.Navigator>
  );
}

function AppRoot() {
  // const token = useSelector((s: any) => s.auth.token);
  // const { data: user } = useFetchUserQuery(undefined, { skip: !token });
  // const signedIn = !!token && !!user;
  const signedIn = true;

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="rootStack"
        screenOptions={{
          headerStyle: { backgroundColor: Colours.baseBlue },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      >
        {signedIn ? (
          <>
            <Stack.Screen
              name="NavTabs"
              component={Tabs}
              options={({ navigation }) => ({
                title: "Home",
                headerRight: () => (
                  <ProfileButton
                    onPress={() => navigation.navigate("Profile")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Profile",
                presentation: "modal",
                gestureDirection: "vertical",
                animation: "slide_from_bottom",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: "Sign Up" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}
