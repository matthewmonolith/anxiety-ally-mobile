import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, AnimatedFAB } from "react-native-paper";
import { useState } from "react";
import { Colours } from "utils/Colours";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";

type Mood = "happy" | "sad" | "calm" | "neutral";

const moods: { value: Mood; label: string; image: any }[] = [
  {
    value: "happy",
    label: "Happy",
    image: require("../../assets/Images/happy.png"),
  },
  { value: "sad", label: "Sad", image: require("../../assets/Images/sad.png") },
  {
    value: "calm",
    label: "Calm",
    image: require("../../assets/Images/calm.png"),
  },
  {
    value: "neutral",
    label: "Neutral",
    image: require("../../assets/Images/neutral.png"),
  },
];

interface Journal {
  mood: Mood;
  title: string;
  intensity: string;
  caption: "";
}

const CreateJournalEntry = () => {
  const handleStateChange = (key: keyof Journal, value) => {
    setJournalState((currentState) => {
      return {
        ...currentState,
        [key]: value,
      };
    });
  };

  const [journalState, setJournalState] = useState<Journal>({
    mood: "happy",
    title: "",
    intensity: "1",
    caption: "",
  });

  const [isExtended, setIsExtended] = useState(true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const handleSave = () => {
    console.log("saved!");
  };

  return (
    <ScrollView style={styles.journal}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingArea}
        behavior="position"
        keyboardVerticalOffset={120}
      >
        <View style={styles.journalMood}>
          <View style={styles.inputSection}>
            <Text style={styles.journalLabelText}>
              How are you feeling today?
            </Text>
          </View>
          <View style={styles.moodPicker}>
            {moods.map((m) => (
              <Pressable
                key={m.value}
                onPress={() => handleStateChange("mood", m.value)}
              >
                <Text>{m.label}</Text>
                <View
                  style={[
                    styles.moodPickerItem,
                    journalState.mood === m.value &&
                      styles.moodPickerItemSelected,
                  ]}
                >
                  <Image source={m.image} style={styles.moodIcon} />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.journalSection}>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.journalInput}
              label="Journal Title"
              value={journalState.title}
              onChangeText={(text) => handleStateChange("title", text)}
              underlineColor={Colours.baseOrange}
              activeUnderlineColor={Colours.highlightBlue}
            />
          </View>
        </View>
        <View style={styles.journalSection}>
          <View style={styles.inputSection}>
            <Text style={styles.journalLabelText}>
              How strong are your feelings?
            </Text>
            <View style={styles.intensityPicker}>
              <Picker
                selectedValue={journalState.intensity}
                onValueChange={(itemValue) =>
                  handleStateChange("intensity", itemValue)
                }
              >
                {Array.from({ length: 10 }, (_, i) => {
                  i = i + 1;
                  return <Picker.Item label={i.toString()} value={i} key={i} />;
                })}
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.journalSection}>
          <View style={styles.inputSection}>
            <Text style={styles.journalLabelText}>
              Write your thoughts here
            </Text>
            <TextInput
              multiline
              style={[styles.journalInput, styles.journalMultiline]}
              label="Your Thoughts"
              value={journalState.caption}
              onChangeText={(text) => handleStateChange("caption", text)}
              underlineColor={Colours.baseOrange}
              activeUnderlineColor={Colours.highlightBlue}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <AnimatedFAB
        icon={"plus"}
        label="Save entry    "
        extended={isExtended}
        onPress={handleSave}
        visible={true}
        animateFrom="right"
        iconMode="static"
        style={styles.fabStyle}
        color="white"
      />
    </ScrollView>
  );
};
export default CreateJournalEntry;
const styles = StyleSheet.create({
  journal: {
    flex: 1,
    backgroundColor: Colours.baseBlue,
  },
  journalMood: {
    backgroundColor: Colours.baseCream,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  journalSection: {
    marginTop: 15,
  },
  inputSection: {
    display: "flex",
    alignItems: "center",
  },
  journalLabelText: {
    fontSize: 18,
    backgroundColor: Colours.baseOrange,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    marginTop: 15,
  },
  moodPicker: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    marginVertical: 20,
  },
  moodPickerItem: {
    width: 75,
    height: 75,
    backgroundColor: Colours.baseBlue,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  moodPickerItemSelected: {
    backgroundColor: Colours.highlightBlue,
  },
  moodIcon: {
    width: 60,
    height: 60,
  },
  journalInput: {
    width: "80%",
    marginTop: 15,
  },
  intensityPicker: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "#e7e0ec",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  journalMultiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  keyboardAvoidingArea: {
    flex: 1,
  },
  fabStyle: {
    bottom: -85,
    right: 16,
    position: "absolute",
    backgroundColor: Colours.baseOrange,
  },
});
