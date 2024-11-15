import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const sender = [
  {
    name: "SenderName",
    profile: require("../../assets/img/profileWinter.png"),
    date: "Mmmm DD, YYYY" + " at " + "HH:MM A",
    commentText:
      "We should consider separating the Icons and Components in creating a UI Design.",
  },
];

const yourReply = [
  {
    profile: require("../../assets/img/profileWinter.png"),
    commentText: "Copy thatdsadasasdsdasdas",
  },
];

export const Comment = () => (
  <View className="flex-1 justify-between">
    {/* Outer View */}
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View>
        {/* Display original comment */}
        <View className="flex-row">
          <Image
            source={sender[0].profile}
            className="h-[40] w-[40] rounded-full mr-2"
          />
          <View className="flex-col">
            <Text className="text-gray-400">{sender[0].date}</Text>
            <Text>
              new comment from{" "}
              <Text style={{ fontWeight: "bold" }}>{sender[0].name}</Text>
            </Text>
          </View>
        </View>
        <Text className="mt-3 bg-gray-200 p-4 rounded-bl-xl rounded-br-xl rounded-tr-xl">
          {sender[0].commentText}
        </Text>

        {/* Display your reply */}
        {yourReply.map((reply, index) => (
          <View key={index} className="flex-row justify-end mt-4 items-center">
            <View className="flex-col">
              <Text className="mt-1 bg-gray-200 p-4 rounded-bl-xl rounded-br-xl rounded-tl-xl mr-2">
                {reply.commentText}
              </Text>
            </View>
            <Image
              source={reply.profile}
              className="h-[40] w-[40] rounded-full mr-2"
            />
          </View>
        ))}
      </View>
    </ScrollView>
    <View className="flex-row items-center mt-2">
      <TextInput
        className="h-[50px] w-[220px] border border-gray-300 rounded-lg pl-3 mb-2"
        placeholder="Type something..." // Placeholder text
      />
      <TouchableOpacity className="bg-mainBackground rounded-lg h-[50px] w-[50px] mb-2 ml-2 items-center justify-center">
        {/* NativeWind classes */}
        <Image
          source={require("../../assets/icons/TaskOverViewIcons/send.png")}
          className="h-5 w-5" // Adjust icon size with NativeWind
        />
      </TouchableOpacity>
    </View>
  </View>
);
