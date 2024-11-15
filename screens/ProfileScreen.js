import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Settings from "../screens/Settings";

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

const postEvent = [
  {
    profilePicture: require("../assets/profileIcons/profilePicture.png"),
    fullName: "Ning Ning",
    postTime: "2 hours ago",
    postTitle: "Hello EveryOne!",
    postDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    dateOfTheEvent: "October 20, 2024",
    timeOfTheEvent: "",
  },
];

export default function ProfileScreen() {
  const profile = UserInfo[0];
  const navigation = useNavigation();

  const [showMore, setShowMore] = useState(false); // State to toggle additional info
  const [inputHeight, setInputHeight] = useState(40); // Initial height

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom to prevent clipping
      >
        {/* Header container */}
        <View className="flex-row items-center mt-2 justify-between w-full px-4">
          {/* Back icon */}
          <TouchableOpacity className="h-[30px] w-[30px] border justify-center items-center rounded-[12px] border-gray-300">
            <Image
              source={require("../assets/profileIcons/back.png")}
              className="h-[13px] w-[14px]"
            />
          </TouchableOpacity>

          {/* Profile text centered */}
          <Text className="text-[18px] font-medium">Profile</Text>

          {/* Settings icon */}
          <TouchableOpacity
            className="h-[40px] w-[40px] border justify-center items-center rounded-full border-gray-300"
            onPress={() => navigation.navigate("Settings")} // Navigate to Settings
          >
            <Image
              source={require("../assets/profileIcons/settings.png")}
              className="h-[16px] w-[18px]"
            />
          </TouchableOpacity>
        </View>

        {/* Profile container */}
        <View className="mx-5">
          {/*Profile and Info */}
          <View className="flex-row items-center">
            <View className="rounded-full mt-8 border-[.5px] border-gray-400 w-[70px] h-[70px] justify-center items-center">
              <Image
                source={profile.profilePicture}
                className="h-[65px] w-[65px]"
              />
            </View>
            <View className="flex-col ml-2 mt-5">
              <Text className="font-bold text-[14px]">{profile.fullName}</Text>
              <Text className="font-regular text-[14px]">
                {profile.userName}
              </Text>
            </View>
          </View>

          {/* Followers and Following */}
          <View className="flex-row justify-between items-center mt-5">
            <View className="flex-row mt-2 items-center">
              {profile.following.slice(0, 3).map((following, index) => (
                <Image
                  key={index}
                  source={following}
                  className="w-[24px] h-[24px] rounded-full m-[-3px] border"
                />
              ))}
              <View className="flex-col items-start ml-3">
                <Text className="font-bold text-[14px]">
                  {profile.followingCount}
                </Text>
                <Text className="font-regular text-[14px]">Following</Text>
              </View>
            </View>

            <View className="flex-row mt-2 items-center">
              {profile.followers.slice(0, 3).map((follower, index) => (
                <Image
                  key={index}
                  source={follower}
                  className="w-[24px] h-[24px] rounded-full m-[-3px] border"
                />
              ))}
              <View className="flex-col items-start ml-3">
                <Text className="font-bold text-[14px]">
                  {profile.followersCount}
                </Text>
                <Text className="font-regular text-[14px]">Followers</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bio and Edit Button */}
        <View className="mx-5 mt-4">
          <View className="justify-end items-end">
            <TouchableOpacity className="flex-row bg-gray-100 items-center h-[25px] w-[106px] rounded-[5px] border-gray-300 border">
              <Image
                source={require("../assets/profileIcons/edit.png")}
                className="h-[15px] w-[15px] mr-2 ml-2"
              />
              <Text>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bio Container */}
        <View className="mx-5 border-b pb-[5%] border-gray-200">
          <Text className="font-medium text-[16px] mb-2">Bio</Text>
          <Text className="font-normal text-[14px] leading-[20px] text-gray-500">
            {profile.bio}
          </Text>
        </View>

        {/* Skills Container */}
        <View className="mx-5 border-b pb-[5%] border-gray-50 mt-5">
          <Text className="font-medium text-[16px] mb-2">Skills</Text>
          <View className="flex-row flex-wrap space-x-2">
            {profile.skills.map((skill, index) => (
              <View
                key={index}
                className="px-2 py-1 bg-gray-200 rounded-[5px] mb-2 mt-2"
              >
                <Text className="text-sm text-gray-700">{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* About and View Details */}
        <View className="mx-5 border-b pb-[5%] border-gray-50 mt-5">
          <Text className="font-medium text-[16px] mb-2">About</Text>
          <View>
            <View className="flex-row mt-4 items-center">
              <Image
                source={require("../assets/profileIcons/fullName.png")}
                className="h-[18px] w-[18px]"
              />
              <Text className="font-medium ml-[10px] text-[16px] text-gray-600">
                {profile.fullName}
              </Text>
            </View>
            <View className="flex-row mt-4 items-center">
              <Image
                source={require("../assets/profileIcons/email.png")}
                className="h-[18px] w-[18px]"
              />
              <Text className="font-medium ml-[10px] text-[16px] text-gray-600">
                {profile.email}
              </Text>
            </View>
          </View>
          {/* Conditionally Rendered Extra Info */}
          {showMore && (
            <View className="flex-col">
              <View className="flex-row mt-4 items-center">
                <Image
                  source={require("../assets/profileIcons/id.png")}
                  className="h-[18px] w-[18px]"
                />
                <Text className="font-medium ml-[10px] text-[16px] text-gray-600">
                  {profile.studentID}
                </Text>
              </View>
              <View className="flex-row mt-4 items-center">
                <Image
                  source={require("../assets/profileIcons/department.png")}
                  className="h-[18px] w-[18px]"
                />
                <Text className="font-medium ml-[10px] text-[16px] text-gray-600">
                  {profile.department}
                </Text>
              </View>
            </View>
          )}
          {/* View Details Button */}
          <TouchableOpacity
            className="w-[100%] bg-gray-200 p-2 mt-5 rounded-[5px]"
            onPress={() => setShowMore(!showMore)}
          >
            <Text className="text-center">
              {showMore ? "Hide Details" : "View Details"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Post Container */}
        <View className="mx-5 border-b pb-[5%] border-gray-50 mt-5 ">
          <Text className="font-medium text-[16px] mb-2">Posts</Text>
          <View className="flex-row flex-wrap space-x-2 items-center ">
            <Image
              source={profile.profilePicture}
              className="h-[40px] w-[40px] mt-3 mr-2"
            />
            <TouchableOpacity className="w-[72%]">
              <Text>Post Something...</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-end">
              <Image
                source={require("../assets/profileIcons/imageIcon.png")}
                className="h-[17px] w-[20px]"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* My Feed Container */}
        <View className="mx-5 border-b pb-[5%] border-gray-50 mt-5 ">
          <Text className="font-medium text-[16px] mb-2">Your Feed</Text>
          {/*PROFILE CONTAINER POST */}
          <View className="flex-row space-x-2 items-center ">
            <Image
              source={profile.profilePicture}
              className="h-[50px] w-[50px] mt-5"
            />
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
