import {
  NavigationContainer,
  CommonActions,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "./screens/auth/Login";
import { Colours } from "utils/Colours";
import Profile from "screens/Profile";
import Journal from "screens/Journal/Journal";
import Exposure from "screens/Exposure";
import Community from "screens/Community";
import SignUp from "screens/auth/SignUp";
import { store } from "store";
import { Provider } from "react-redux";
import ProfileButton from "components/UI/ProfileButton";
import IconButton from "components/UI/IconButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, BottomNavigation } from "react-native-paper";
import ThoughtsJournal from "screens/Journal/ThoughtsJournal";
import CreateJournalEntry from "screens/Journal/CreateJournalEntry";
import PhobiaExposures from "screens/exposure/PhobiaExposures";
import CreatePhobiaExposure from "screens/exposure/CreatePhobiaExposure";
import EditPhobiaExposure from "screens/exposure/EditPhobiaExposure";
import MapboxGl from "@rnmapbox/maps";

MapboxGl.setAccessToken(
 process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN
);
MapboxGl.setConnected(true);
MapboxGl.setTelemetryEnabled(false);
MapboxGl.setWellKnownTileServer("Mapbox");

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      id="rootApp"
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) =>
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 24,
            }) ?? null
          }
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : typeof options.title === "string"
                ? options.title
                : route.name;
            return label;
          }}
          activeColor="white"
          activeIndicatorStyle={{ backgroundColor: Colours.baseOrange }}
          inactiveColor="rgba(255,255,255,0.6)"
          style={{ backgroundColor: Colours.baseBlue }}
        />
      )}
    >
      <Tab.Screen
        name="Journal"
        component={Journal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Exposure"
        component={Exposure}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
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
          headerTransparent: true,
          headerTitle: "",
          contentStyle: { paddingTop: 100 },
        }}
      >
        {signedIn ? (
          <>
            <Stack.Screen
              name="NavTabs"
              component={Tabs}
              options={({ navigation, route }) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "";

                const titles: Record<string, string> = {
                  Exposure: "Your Exposures",
                  Journal: "Your Journal",
                  Community: "Anxiety Ally Community",
                };

                return {
                  headerTitle: titles[routeName] || "Anxiety Ally",
                  headerTitleAlign: "center",
                  headerLeft: () => (
                    <ProfileButton
                      onPress={() => navigation.navigate("Profile")}
                    />
                  ),
                  headerRight: () => (
                    <IconButton
                      iconName="help-circle"
                      color={Colours.baseBlue}
                      size={35}
                    />
                  ),
                };
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                presentation: "modal",
                gestureDirection: "vertical",
                animation: "slide_from_bottom",
                headerTitleAlign: "center",
                headerTitle: "Profile",
                headerTintColor: "white",
                headerRight: () => (
                  <IconButton
                    iconName="log-out-outline"
                    size={30}
                    color="white"
                  />
                ),
                contentStyle: {
                  paddingTop: 120,
                  backgroundColor: Colours.baseBlue,
                },
              }}
            />
            <Stack.Screen
              name="Thoughts"
              component={ThoughtsJournal}
              options={{
                headerTitleAlign: "center",
                headerTitle: "Thoughts & Feelings",
                contentStyle: {
                  paddingTop: 120,
                },
              }}
            />
            <Stack.Screen
              name="CreateJournal"
              component={CreateJournalEntry}
              options={{
                headerTitleAlign: "center",
                headerTitle: "Create a new entry",
                headerStyle: {
                  backgroundColor: Colours.baseCream,
                },
              }}
            />
            <Stack.Screen
              name="PhobiaExposures"
              component={PhobiaExposures}
              options={{
                headerTitleAlign: "center",
                headerTitle: "Your Exposures",
                contentStyle: {
                  paddingTop: 120,
                },
              }}
            />
            <Stack.Screen
              name="CreatePhobiaExposure"
              component={CreatePhobiaExposure}
              options={{
                headerTitleAlign: "center",
                headerTitle: "Create a new exposure task",
                contentStyle: {
                  paddingTop: 120,
                },
              }}
            />
            <Stack.Screen
              name="EditPhobiaExposure"
              component={EditPhobiaExposure}
              options={{
                headerTitleAlign: "center",
                headerTitle: "Update your exposure",
                contentStyle: {
                  paddingTop: 120,
                },
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider>
          <AppRoot />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
