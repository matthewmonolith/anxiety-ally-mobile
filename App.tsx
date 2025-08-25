import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
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

const Drawer = createDrawerNavigator();
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
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            Profile: "person-circle",
            Journal: "book",
            Exposure: "leaf",
            Community: "people",
          };
          return (
            <Ionicons
              name={map[route.name] || "ellipse"}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Exposure" component={Exposure} />
      <Tab.Screen name="Community" component={Community} />
    </Tab.Navigator>
  );
}

function handleLogout() {
  console.log("log out test");
}

function AppDrawer() {
  //const { signOut } = useAuth();
  return (
    <Drawer.Navigator
      id="rootDrawer"
      drawerContent={(props) => (
        <View style={{ flex: 1, paddingTop: 40 }}>
          <DrawerItem
            label="About"
            onPress={() => props.navigation.navigate("About")}
          />
          <DrawerItem label="Logout" onPress={handleLogout} />
        </View>
      )}
    >
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      id="rootStack"
      screenOptions={{
        headerStyle: { backgroundColor: Colours.baseBlue },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
      }}
    >
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
    </Stack.Navigator>
  );
}

export default function App() {
  const token = useSelector((state) => state.auth.token);
  const { data: user, isFetching } = useFetchUserQuery(undefined, {
    skip: !token,
  });
  const signedIn = !!token && !!user

  return (
    <Provider store={store}>
      <NavigationContainer>
        {signedIn ? <AppDrawer /> : <AuthStack />}
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
}
