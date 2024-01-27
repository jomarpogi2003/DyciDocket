import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Hero } from "../assets";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row px-6 mt-14 mb-0 items-center space-x-2">
        <View className="w-30 h-16 bg-blue-300 rounded-full items-center">
          <Text className="text-slate-800 text-3xl mt-3 px-3 font-semibold">
            TRAVEL
          </Text>
        </View>
        <View>
          <Text className="text-3xl font-semibold text-slate-900">SAHAY</Text>
        </View>
      </View>
      <View className="px-6 mt-35 space-y-3">
        <Text className="text-[#3C6072] mt-4 mb-3 text-[40px]">
          Enjoy & ,Travel Stress Free With...
        </Text>
        <Text className="text-[#00BCC9] text-[25px] font-bold">
          Our Travel Companion App
        </Text>
        <Text className="text-center font-medium text-2xl bg-gradient-to-r from-blue-500 to-green-500 text-black rounded-lg shadow-md">
          Designed to enhance and streamline the overall travel experience for
          users.
        </Text>
      </View>

      <View className="w-[400px] h-[250px] bg-[#576cc2] rounded-full absolute mb-12 bottom-32 -right-36"></View>
      <View className="w-[400px] h-[250px] bg-[#3fedea] rounded-full absolute mb-12 -bottom-28 -left-36"></View>

      <View flex-1 relative items-center justify-center>
        <Image source={Hero} className="w-full h-80 mt-24 object-cover" />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Discover")}
        className="absolute m-6  ml-40 bottom-44 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#071168] rounded-full items-center justify-center"
      >
        <View className="justify-center items-center w-20 h-20 rounded-full bg-[#3fedea] ">
          <Text className="text-3xl font-semibold text-[#292d95] ">Go</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
