import ProfileButton from "components/UI/ProfileButton";
import StatsCard from "components/UI/StatsCard";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Colours } from "utils/Colours";

import IconButton from "components/UI/IconButton";
import BarChart from "components/UI/BarChart";

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
        <BarChart
          data={DATA}
          yAxis="avgMood"
          xAxis="month"
          heading="Your Monthly Average Mood"
        />
        <View style={styles.profileButtonsContainer}>
          <View style={styles.backgroundImageContainer}>
            <ImageBackground
              source={require("../assets/Images/yoga.png")}
              style={styles.backgroundImage}
            />
          </View>
          <IconButton iconName="log-out-outline" size={30} color="white" />
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
    marginBottom: 35,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
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
  backgroundImageContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backgroundImage: {
    width: 130,
    height: 130,
  },
});
