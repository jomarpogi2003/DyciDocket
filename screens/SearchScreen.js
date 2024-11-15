import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View className="flex-row mx-10 justify-center items-center mt-3 ml-6">
          <TouchableOpacity className="mr-2 border p-2 rounded-xl border-gray-200">
            <Image
              source={require("../assets/icons/back.png")}
              className="h-[15px] w-[15px]  "
            />
          </TouchableOpacity>

          <TextInput
            className="border rounded-full ml-2 pl-5 border-gray-400 h-[50px] w-[95%]"
            placeholder="Search Friends..."
          ></TextInput>
        </View>
        <Text className="mt-5 mx-5 font-bold mb-5">Recent</Text>
        <View className="flex-row ml-5">
          <View className="rounded-full bg-blue-900 h-[50px] w-[50px] justify-center items-center">
            <Image
              source={require("../assets/icons/friends.png")}
              className="h-[30px] w-[27px]"
            />
          </View>
          <View className="flex-col ml-3 justify-center">
            <Text className="font-bold">Friends</Text>
            <Text>Search for people</Text>
          </View>
        </View>
        <View className="flex-row ml-5 mt-3">
          <View className="rounded-full bg-blue-900 h-[50px] w-[50px] justify-center items-center">
            <Image
              source={require("../assets/icons/GroupIcon.png")}
              className="h-[30px] w-[27px]"
            />
          </View>
          <View className="flex-col ml-3 justify-center">
            <Text className="font-bold">Groups</Text>
            <Text>See groups you’ve joined</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
