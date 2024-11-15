import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MeetingTask() {
  const [selectedOption, setSelectedOption] = useState("Physical");
  const navigation = useNavigation(); // Hook to get the navigation prop

  const handleNavigate = () => {
    navigation.navigate("Map"); // Navigate to the desired screen
  };
  return (
    <View className="my-5 border-t border-gray-50">
      <Text className="mt-[22px] ml-10 text-[18px] font-medium text-black">
        Meeting
      </Text>
      <Text className="ml-10 text-[12px] text-gray-500">
        Note: This is only for meeting task category
      </Text>

      {/* Radio Buttons */}
      <View className="flex-row items-center mt-4 ml-10">
        {/* Physical Option */}
        <TouchableOpacity
          className="flex-row items-center mr-5"
          onPress={() => setSelectedOption("Physical")}
        >
          <View
            className={`h-5 w-5 rounded-full border-2 ${
              selectedOption === "Physical"
                ? "border-blue-500"
                : "border-gray-400"
            } items-center justify-center`}
          >
            {selectedOption === "Physical" && (
              <View className="h-3 w-3 rounded-full bg-blue-500" />
            )}
          </View>
          <Text className="ml-2 text-black">Physical</Text>
        </TouchableOpacity>

        {/* Virtual Option */}
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => setSelectedOption("Virtual")}
        >
          <View
            className={`h-5 w-5 rounded-full border-2 ${
              selectedOption === "Virtual"
                ? "border-blue-500"
                : "border-gray-400"
            } items-center justify-center`}
          >
            {selectedOption === "Virtual" && (
              <View className="h-3 w-3 rounded-full bg-blue-500" />
            )}
          </View>
          <Text className="ml-2 text-black">Virtual</Text>
        </TouchableOpacity>
      </View>

      {/* Link Input for Virtual Option */}
      {selectedOption === "Virtual" && (
        <View className="flex-row items-center mt-4 mx-10 border border-gray-300 rounded-md">
          <TextInput
            placeholder="Link to the Meeting"
            placeholderTextColor="#A0A0A0"
            className="flex-1 px-4 py-2 text-gray-500"
          />
          <TouchableOpacity className="px-3 py-2 bg-blue-100 rounded-md mr-2">
            <Text className="text-blue-500 font-medium">Paste</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Link Input for Physical Option */}
      {selectedOption === "Physical" && (
        <View className="flex-row items-center mt-4 mx-10 border border-gray-300 rounded-md">
          <TextInput
            placeholder="Link to the location"
            placeholderTextColor="#A0A0A0"
            className="flex-1 px-4 py-2 text-gray-500"
          />
          <TouchableOpacity
            className="px-3 py-2 bg-blue-100 rounded-md mr-2"
            onPress={handleNavigate}
          >
            <Text className="text-blue-500 font-medium">Open</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
