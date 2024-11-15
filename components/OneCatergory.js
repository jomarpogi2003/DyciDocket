import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { categories } from "../components/Declaration";
import CategoryButton from "../components/Category";
import SetDate from "../components/SetDate";
import Meeting from "../components/MeetingComponent";
import RepeatModal from "../components/RepeatTask";
import Slider from "@react-native-community/slider";

export default function OneCategory() {
  const [isPomodoroEnabled, setPomodoroEnabled] = useState(false);
  const navigation = useNavigation(); // Get the navigation object
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [selectedType, setSelectedType] = useState("Health & Fitness");
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [repeatOption, setRepeatOption] = useState("None");
  const [workingSessions, setWorkingSessions] = useState(1);
  const [shortBreak, setShortBreak] = useState(1);
  const [longBreak, setLongBreak] = useState(1);
  const togglePomodoro = () =>
    setPomodoroEnabled((previousState) => !previousState);

  const toggleRepeatModal = () => {
    setRepeatModalVisible(!isRepeatModalVisible);
  };

  const handleRepeatSelection = (option) => {
    setRepeatOption(option);
    setRepeatModalVisible(false);
  };

  const handleNavigateFriends = () => {
    navigation.navigate("Friends"); // Navigate to the desired screen
  };
  const handleCategoryPress = (category) => {
    setSelectedCategory(category.title);
    setSelectedType(category.types[0]?.title || "");

    // Navigate to Home screen if "Physical" category is selected
    if (category.title === "Physical") {
      navigation.navigate("Home"); // Replace "Home" with your actual home screen name
    }
  };

  const friends = [
    // Add your friends' images here
  ];

  return (
    <View className="bg-white">
      <Text className="mt-[22px] ml-10 text-[18px] font-medium text-black">
        Select Task Category
      </Text>
      <View className="flex-row flex-wrap mt-3 ml-8">
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            title={category.title}
            color={category.color}
            icon={category.icon}
            onPress={() => handleCategoryPress(category)}
            isSelected={selectedCategory === category.title}
          />
        ))}
      </View>
      <Text className="mt-[10px] ml-10 text-[18px] font-medium text-black">
        Type
      </Text>
      <View className="flex-row flex-wrap mt-3 ml-8">
        {categories
          .find((category) => category.title === selectedCategory)
          .types.map((type, index) => (
            <CategoryButton
              key={index}
              title={type.title}
              color={type.color}
              icon={type.icon}
              onPress={() => setSelectedType(type.title)}
              isSelected={selectedType === type.title}
            />
          ))}
      </View>

      {selectedCategory !== "Personal" && (
        <View>
          <Text className="ml-10 mt-5 text-[18px] font-medium text-black">
            Invite Friends
          </Text>
          <View className="flex-row space-x-2 mt-2 mx-10 mb-3">
            {friends.map((friend, index) => (
              <Image
                key={index}
                source={friend}
                className="rounded-full h-[32px] w-[32px]"
              />
            ))}
            <TouchableOpacity
              className="rounded-full h-[32px] w-[32px] bg-gray-300 border-2 border-gray-500 justify-center items-center"
              onPress={handleNavigateFriends}
            >
              <Image
                source={require("../assets/icons/add.png")}
                className="h-[15px] w-[15px] items-center"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <SetDate />
      <View>
        {/* Pomodoro tech */}
        <View className="flex-row justify-between mr-5 items-center">
          {selectedCategory === "Personal" && (
            <>
              <View className="flex-col">
                <Text className="mx-10 text-black font-light text-[13px]">
                  Enable pomodoro:
                </Text>
                <Text className="mx-10 text-black font-medium text-[18px]">
                  Pomodoro Technique
                </Text>
              </View>
              <Switch
                value={isPomodoroEnabled}
                onValueChange={togglePomodoro}
                style={{ margin: 10 }}
              />
            </>
          )}
        </View>

        {/* Pomodoro range sliders */}
        {selectedCategory === "Personal" && isPomodoroEnabled && (
          <View className="mx-10 mt-5 font-medium">
            {/* Container Working Sessions */}
            <View className="flex-col mb-5">
              <Text>Working Sessions: {workingSessions}</Text>
              <Slider
                minimumValue={1}
                maximumValue={8}
                value={workingSessions}
                onValueChange={setWorkingSessions}
                step={1}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#d3d3d3"
                style={{ marginTop: 10 }}
              />
            </View>

            {/* Container Short Break */}
            <View className="flex-col mb-5">
              <Text>Short Break: {shortBreak} minutes</Text>
              <Slider
                minimumValue={1}
                maximumValue={15}
                value={shortBreak}
                onValueChange={setShortBreak}
                step={1}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#d3d3d3"
                style={{ marginTop: 10 }}
              />
            </View>

            {/* Container Long Break */}
            <View className="flex-col mb-5">
              <Text>Long Break: {longBreak} minutes</Text>
              <Slider
                minimumValue={1}
                maximumValue={30}
                value={longBreak}
                onValueChange={setLongBreak}
                step={1}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#d3d3d3"
                style={{ marginTop: 10 }}
              />
            </View>
          </View>
        )}
      </View>
      <View className="my-5 mx-10 flex-row justify-between items-center border-t border-gray-50">
        <View className="flex-row items-center mt-5">
          <Image
            source={require("../assets/icons/Repeat.png")}
            className="h-[17px] w-[23px] mr-2"
          />
          <Text className="text-black font-medium">Repeat Task</Text>
        </View>
        <TouchableOpacity
          className="h-[20px] w-[73px] bg-violet-300 rounded-full justify-center items-center flex-row mt-5"
          onPress={toggleRepeatModal}
        >
          <View className="h-[6] w-[6] rounded-full bg-blue-950 mr-2" />
          <Text className="font-medium text-[10px] text-blue-950">
            {repeatOption}
          </Text>
        </TouchableOpacity>
      </View>

      <RepeatModal
        visible={isRepeatModalVisible}
        onClose={toggleRepeatModal}
        onSelectRepeat={handleRepeatSelection}
      />

      <View className="mx-10 flex-row justify-between items-center border-t border-gray-50">
        <View className="flex-row items-center mt-5">
          <Image
            source={require("../assets/icons/Attachment.png")}
            className="h-[24px] w-[24px] mr-2"
          />
          <Text className="text-black font-medium">Attachment</Text>
        </View>
        <View className="h-[20px] w-[73px] bg-violet-50 rounded-full justify-center items-center flex-row mt-5">
          <Text className="font-medium text-[10px] text-blue-950">None</Text>
        </View>
      </View>

      {selectedCategory === "Meeting" && <Meeting />}
    </View>
  );
}
