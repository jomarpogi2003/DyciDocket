import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import CategoryMain from "../components/OneCatergory";
import { SafeAreaView } from "react-native-safe-area-context";
import SetDate from "../components/SetDate";
import Meeting from "../components/MeetingComponent";
import RepeatModal from "../components/RepeatTask"; // Import the RepeatModal component
import { useNavigation } from "@react-navigation/native";

export default function Personal() {
  const navigation = useNavigation(); // Hook to get the navigation prop

  const handleNavigate = () => {
    navigation.navigate("Home"); // Navigate to the desired screen
  };
  const handlePress = () => {
    Alert.alert("Task Created", "Your task has been successfully created!", [
      { text: "OK" },
    ]);
  };
  const handleNavigateFriends = () => {
    navigation.navigate("Meeting"); // Navigate to the desired screen
  };
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [repeatOption, setRepeatOption] = useState("None"); // State to store selected repeat option

  const toggleRepeatModal = () => {
    setRepeatModalVisible(!isRepeatModalVisible);
  };

  const handleRepeatSelection = (option) => {
    setRepeatOption(option);
    setRepeatModalVisible(false); // Close the modal after selection
  };

  return (
    <SafeAreaView className="flex-1 bg-mainBackground pt-5">
      <ScrollView>
        {/* Header Line */}
        <View className="flex-row items-center mx-4 space-x-2 px-4">
          <TouchableOpacity onPress={handleNavigate}>
            <Image
              source={require("../assets/icons/BackIcon.png")}
              className="h-8 w-8"
            />
          </TouchableOpacity>
          <Text className="text-white flex-1 text-center pr-10 text-2xl">
            Create a task
          </Text>
        </View>

        {/* Info Container */}
        <View className="flex-1 bg-white rounded-tl-3xl rounded-tr-3xl mt-10 pb-20">
          <Text t className="mt-10 ml-10 text-[18px] font-medium text-black">
            Title
          </Text>
          <TextInput className="px-5 py-4 border border-textInputBorder mt-2 ml-10 mr-10 rounded-md bg-textInputBg font-medium text-stone-300" />

          {/* Info Container Description */}
          <Text className="mt-[22px] ml-10 text-[18px] font-medium text-black">
            Description
          </Text>
          <TextInput
            className="border border-textInputBorder mt-2 ml-10 p-3 mr-10 rounded-md bg-textInputBg font-semibold text-l h-20"
            multiline
            textAlignVertical="top"
          />

          {/* CATEGORIES */}
          <CategoryMain />

          <View className="justify-center items-center mt-8 ml-[60%]">
            <TouchableOpacity
              className="h-[50] w-[120] rounded-3xl bg-mainBackground justify-center items-center"
              onPress={handlePress} // Add the onPress handler here
            >
              <Text className="text-white ">Create Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
