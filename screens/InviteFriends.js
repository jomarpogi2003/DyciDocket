import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // You can choose a different icon library if you prefer

export default function Friends() {
  return (
    <SafeAreaView className="flex-1 mt-10">
      <View className="flex-row items-center justify-between px-4 py-2">
        {/* Back Button */}
        <TouchableOpacity>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        {/* Search Area */}
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#A0A0A0"
          className="flex-1 mx-4 px-4 py-2 border border-gray-300 rounded-md"
        />

        <TouchableOpacity>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center">
        <Text>Welcome to the Friends Search Screen!</Text>
      </View>
    </SafeAreaView>
  );
}
