import ProfileButton from "components/UI/ProfileButton";
import StatsCard from "components/UI/StatsCard";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colours } from "utils/Colours";

import { useFont } from "@shopify/react-native-skia";
import LineChart from "components/UI/LineChart";
import IconButton from "components/UI/IconButton";

const DATA = [
  { month: "Jan", avgMood: 3 },
  { month: "Feb", avgMood: 7 },
  { month: "Mar", avgMood: 5 },
  { month: "Apr", avgMood: 9 },
  { month: "May", avgMood: 2 },
  { month: "Jun", avgMood: 8 },
  { month: "Jul", avgMood: 6 },
  { month: "Aug", avgMood: 10 },
  { month: "Sep", avgMood: 4 },
  { month: "Oct", avgMood: 7 },
  { month: "Nov", avgMood: 1 },
  { month: "Dec", avgMood: 5 },
];

interface User {
  userName: string;
  email: string;
  totalPosts: number;
  totalExposures: number;
  averageMood: number;
}

const Profile = ({ navigation }) => {
  const user: User = {
    userName: "Matthew Monolith",
    email: "matthew.page2016@outlook.com",
    totalPosts: 15,
    totalExposures: 12,
    averageMood: 7,
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <ProfileButton main />
          <View style={styles.userNameContainer}>
            <Text style={styles.userNameText}>{user.userName}</Text>
          </View>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.statsContainer}>
            <StatsCard
              count={user.totalPosts}
              colour={Colours.baseOrange}
              iconName="chatbubble-ellipses-outline"
              subTitle="Total Posts"
            />
            <StatsCard
              count={user.totalExposures}
              colour={Colours.baseOrange}
              iconName="leaf-outline"
              subTitle="Total Exposures"
            />
            <StatsCard
              count={user.averageMood}
              colour={Colours.baseOrange}
              iconName="happy-outline"
              subTitle="Average Mood"
            />
          </View>
        </View>
        <LineChart
          data={DATA}
          xAxis="month"
          yAxis="avgMood"
          heading="Your Monthly Average Mood"
        />
        <View style={styles.profileButtonsContainer}>
          <TouchableOpacity style={styles.profileButton}>
            <IconButton
              iconName="information-circle-outline"
              size={25}
              color={Colours.baseOrange}
            />
            <Text>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <IconButton
              iconName="log-out-outline"
              size={25}
              color={Colours.baseOrange}
            />
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  userNameContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  userNameText: {
    fontSize: 18,
    marginRight: 5,
    color: "white",
  },
  editIcon: {
    position: "absolute",
    right: -40,
  },
  userEmail: {
    color: "rgba(255,255,255,0.8)",
  },
  statsContainer: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  profileButtonsContainer: {
    alignSelf: "stretch",
    marginTop: 20
  },
  profileButton: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: 140,
    borderRadius: 10,
  },
});
