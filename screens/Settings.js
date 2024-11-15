import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
const UserInfo = [
  {
    profilePicture: require("../assets/profileIcons/profilePicture.png"),
    fullName: "Ning Ning",
    userName: "@thisisme2021",
    email: "ningningaespa@gmail.com",
    studentID: "2021-00925",
    department: "College Of Computer Studies",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    skills: ["animation", "analytics", "UI", "UX"],
    following: [
      require("../assets/profileIcons/following/following1.png"),
      require("../assets/profileIcons/following/following2.png"),
      require("../assets/profileIcons/following/following3.png"),
      require("../assets/profileIcons/following/following3.png"),
    ],
    followingCount: 4,
    followers: [
      require("../assets/profileIcons/followers/followers1.png"),
      require("../assets/profileIcons/followers/followers2.png"),
      require("../assets/profileIcons/followers/followers3.png"),
    ],
    followersCount: 3,
  },
];
export default function Settings() {
  const [showMore, setShowMore] = useState(false); // State to toggle additional info
  const profile = UserInfo[0];
  const [showPassword, setShowPassword] = useState(false); // State to toggle additional info
  const [showNotification, setShowNotification] = useState(false); // State to toggle additional info
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true); // Controls on/off state of the switch
  const [isTaskRequestEnabled, setIsTaskRequestEnabled] = useState(true); // Controls on/off state of the switch
  const [isFollowRequestEnabled, SetIsFollowRequestEnabled] = useState(true); // Controls on/off state of the switch

  const handleSignOut = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => console.log("Signed out") },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom to prevent clipping
    >
      <View className="flex-1 bg-white">
        <View className="h-[100px] justify-end bg-gray-50">
          <Text className="mx-5 mb-5 font-medium text-[35px]">Settings</Text>
        </View>
        <View className="mt-8 mx-5">
          <Text className="font-semibold text-[18px]">General</Text>
          <View>
            <View>
              <TouchableOpacity
                className="flex-row mt-8 items-center justify-between border-b pb-5 border-gray-100"
                onPress={() => setShowMore(!showMore)}
              >
                <View className="flex-row items-center">
                  <Icon name={"user"} size={20} color={"#000"} />
                  <Text className="ml-4 font-regular text-[18px]">
                    Account Information
                  </Text>
                </View>
                <Icon
                  name={showMore ? "chevron-down" : "chevron-right"}
                  size={18}
                  color={"#000"}
                />
              </TouchableOpacity>
              {showMore && (
                <View className="flex-col">
                  <TouchableOpacity className="flex-row pl-8 mt-4 items-center justify-between border-b pb-5 border-gray-100">
                    <View className="flex-row items-center">
                      <Image
                        source={require("../assets/profileIcons/fullName.png")}
                        className="h-[20px] w-[20px]"
                      />
                      <Text className="ml-4 font-regular text-[16px]">
                        {profile.fullName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row pl-8 mt-4 items-center justify-between border-b pb-5 border-gray-100">
                    <View className="flex-row items-center">
                      <Image
                        source={require("../assets/profileIcons/email.png")}
                        className="h-[20px] w-[20px]"
                      />
                      <Text className="ml-4 font-regular text-[16px]">
                        {profile.email}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row pl-8 mt-4 items-center justify-between border-b pb-5 border-gray-100">
                    <View className="flex-row items-center">
                      <Image
                        source={require("../assets/profileIcons/id.png")}
                        className="h-[20px] w-[20px]"
                      />
                      <Text className="ml-4 font-regular text-[16px]">
                        {profile.studentID}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row pl-8 mt-4 items-center justify-between border-b pb-5 border-gray-100">
                    <View className="flex-row items-center">
                      <Image
                        source={require("../assets/profileIcons/department.png")}
                        className="h-[20px] w-[20px]"
                      />
                      <Text className="ml-4 font-regular text-[16px]">
                        {profile.department}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row pl-8 mt-4 items-center justify-between border-b pb-5 border-gray-100">
                    <View className="flex-row items-center">
                      <Icon name={"edit-2"} size={15} color={"#12224F"} />

                      <Text className="text-blue-500 ml-4 font-regular text-[16px]">
                        Edit Information
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View>
              <TouchableOpacity
                className="flex-row mt-5 items-center justify-between border-b pb-5 border-gray-100"
                onPress={() => setShowPassword(!showPassword)}
              >
                <View className="flex-row items-center">
                  <Icon name={"lock"} size={20} color={"#000"} />
                  <Text className="ml-4 font-regular text-[18px]">
                    Password
                  </Text>
                </View>
                <Icon
                  name={showPassword ? "chevron-down" : "chevron-right"}
                  size={18}
                  color={"#000"}
                />
              </TouchableOpacity>

              {showPassword && (
                <View className="flex-col">
                  <TouchableOpacity className="flex-row pl-8 mt-4 items-center justify-between border-b pb-5 border-gray-100">
                    <View className="flex-row items-center">
                      <Icon name={"shield"} size={20} color={"#8C8C8C"} />

                      <Text className="ml-4 font-regular text-[16px]">
                        Change password
                      </Text>
                    </View>
                    <Icon name={"chevron-right"} size={18} color={"#000"} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View>
              <TouchableOpacity
                className="flex-row mt-5 items-center justify-between border-b pb-5 border-gray-100"
                onPress={() => setShowNotification(!showNotification)}
              >
                <View className="flex-row items-center">
                  <Icon name={"bell"} size={20} color={"#000"} />
                  <Text className="ml-4 font-regular text-[18px]">
                    Notification
                  </Text>
                </View>
                <Icon
                  name={showNotification ? "chevron-down" : "chevron-right"}
                  size={18}
                  color={"#000"}
                />
              </TouchableOpacity>
              {showNotification && (
                <View className="flex-col">
                  <View className="flex-row pl-8 mt-4 items-center justify-between border-b pb-2 border-gray-100">
                    <View className="flex-row items-center">
                      <Icon
                        name={"message-square"}
                        size={20}
                        color={"#8C8C8C"}
                      />
                      <Text className="ml-4 font-regular text-[16px]">
                        Comments
                      </Text>
                    </View>
                    <Switch
                      value={isNotificationEnabled}
                      onValueChange={(value) => setIsNotificationEnabled(value)}
                      thumbColor={isNotificationEnabled ? "#12224F" : "#8C8C8C"}
                      trackColor={{ false: "#767577", true: "#15C6B7" }} // Optional colors for off/on states
                    />
                  </View>
                  <View className="flex-row pl-8 mt-2 items-center justify-between border-b pb-2 border-gray-100">
                    <View className="flex-row items-center">
                      <Icon name={"tag"} size={20} color={"#8C8C8C"} />
                      <Text className="ml-4 font-regular text-[16px]">
                        Task Request
                      </Text>
                    </View>
                    <Switch
                      value={isTaskRequestEnabled}
                      onValueChange={(value) => setIsTaskRequestEnabled(value)}
                      thumbColor={isTaskRequestEnabled ? "#12224F" : "#8C8C8C"}
                      trackColor={{ false: "#767577", true: "#15C6B7" }} // Optional colors for off/on states
                    />
                  </View>
                  <View className="flex-row pl-8 mt-2 items-center justify-between border-b pb-2 border-gray-100">
                    <View className="flex-row items-center">
                      <Icon name={"user-plus"} size={20} color={"#8C8C8C"} />
                      <Text className="ml-4 font-regular text-[16px]">
                        Follow Request
                      </Text>
                    </View>
                    <Switch
                      value={isFollowRequestEnabled}
                      onValueChange={(value) =>
                        SetIsFollowRequestEnabled(value)
                      }
                      thumbColor={
                        isFollowRequestEnabled ? "#12224F" : "#8C8C8C"
                      }
                      trackColor={{ false: "#767577", true: "#15C6B7" }} // Optional colors for off/on states
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          <View className="justify-center items-center">
            <TouchableOpacity
              className="mt-20 bg-btnSignOut h-[65px] w-[318px] justify-center items-center rounded-full"
              onPress={handleSignOut}
            >
              <Text className="font-bold text-[16px]">Sign Out</Text>
            </TouchableOpacity>
            <Text className="mt-3">Version 1.01</Text>
            <Text className="mt-2">@2024-25 Powered by DyciDocket</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
