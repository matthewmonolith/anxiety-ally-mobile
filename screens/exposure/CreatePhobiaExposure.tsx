import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { useState } from "react";
import { Colours } from "utils/Colours";
import { ScrollView } from "react-native-gesture-handler";
import PhotoTaker from "components/UI/PhotoTaker";
import FormInput from "components/UI/forms/FormInput";
import PickerInput from "components/UI/forms/PickerInput";

interface Exposure {
  title: string;
  difficulty: string;
  caption: string;
  image: string;
}

const FAB_SIZE = 56;
const FAB_MARGIN = 16;

const CreateJournalEntry = () => {
  const [exposureState, setExposureState] = useState<Exposure>({
    title: "",
    difficulty: "1",
    caption: "",
    image: "",
  });

  const handleStateChange = (key: keyof Exposure, value: string) => {
    setExposureState((s) => ({ ...s, [key]: value }));
  };

  const difficultyOptions = Array.from({ length: 10 }, (_, i) => {
    const n = i + 1;
    return { label: n.toString(), value: n.toString() };
  });

  const [isExtended, setIsExtended] = useState(true);

  const onScroll = ({ nativeEvent }: any) => {
    const y = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(y <= 0);
  };

  const handleSave = () => {
    console.log("saved!");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.journal}
        contentContainerStyle={{ paddingBottom: FAB_SIZE + FAB_MARGIN * 2 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingArea}
          behavior="position"
          keyboardVerticalOffset={120}
        >
          <FormInput
            value={exposureState.title}
            onChangeText={(text) => handleStateChange("title", text)}
            placeholderText="Exposure Title"
          />
          <FormInput
            labelText="Write your exposure caption"
            multiline
            placeholderText="What do you plan to do?"
            value={exposureState.caption}
            onChangeText={(text) => handleStateChange("caption", text)}
          />
          <PickerInput
            label="How difficult will the exposure be?"
            selectedValue={exposureState.difficulty}
            onValueChange={(v: string) => handleStateChange("difficulty", v)}
            items={difficultyOptions}
          />
          <View style={{ marginTop: 15 }}>
            <PhotoTaker
              onTakeImage={(uri: string) => handleStateChange("image", uri)}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
{/* TODO check when fab text position is fixed */}
      <AnimatedFAB
        icon="plus"
        label="Save entry   "
        extended={isExtended}
        onPress={handleSave}
        visible
        animateFrom="right"
        iconMode="static"
        style={styles.fabStyle}
        color="white"
      />
    </View>
  );
};

export default CreateJournalEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.baseBlue,
  },
  journal: {
    flex: 1,
  },
  keyboardAvoidingArea: {
    flex: 1,
  },
  fabStyle: {
    position: "absolute",
    right: FAB_MARGIN,
    bottom: FAB_MARGIN,
    backgroundColor: Colours.baseOrange,
  },
});
