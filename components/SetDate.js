import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import ModalComponent from "../components/ModalDate"; // Adjust import if needed
import TimeModal from "../components/TimeModal";

export default function SetDate() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const [selectedTime, setSelectedTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  ); // Default to current time

  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update the selected date
    setModalVisible(false); // Close the modal
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Update the selected time
    setTimeVisible(false); // Close the time modal
  };

  return (
    <View className="mt-[18px] flex-1">
      <Text className="ml-10 text-[18px] font-medium text-black">
        Set Task Date
      </Text>
      <View className="flex-row items-center space-x-2 mx-10">
        {/* Date Selector */}
        <TouchableOpacity
          className="h-[50px] w-[50px] border-2 border-dateStroke bg-dateFillColor rounded-[10px] my-5 justify-center items-center"
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../assets/icons/sDate.png")}
            className="h-[19px] w-[19px]"
          />
        </TouchableOpacity>
        <View className="mr-8">
          <Text className="text-gray-500 text-sm">Start Date</Text>
          <Text className="text-l font-medium text-black">
            {formatDate(selectedDate)}
          </Text>
          {/* Display selected date */}
        </View>

        {/* Time Selector */}
        <TouchableOpacity
          className="h-[50px] w-[50px] border-2 border-dateStroke bg-dateFillColor rounded-[10px] my-5 justify-center items-center"
          onPress={() => setTimeVisible(true)}
        >
          <Image
            source={require("../assets/icons/sTime.png")}
            className="h-[19px] w-[19px]"
          />
        </TouchableOpacity>
        <View>
          <Text className="text-gray-500 text-sm">Start Time</Text>
          <Text className="text-l font-medium text-black">{selectedTime}</Text>
        </View>
      </View>
      {/* Date Modal */}
      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // Function to close the modal
        onSelectDate={handleDateSelect} // Pass date selection handler
      />
      {/* Time Modal */}
      <TimeModal
        visible={timeVisible}
        onClose={() => setTimeVisible(false)}
        selectedDate={selectedDate} // Pass the selected date to TimeModal
        onTimeSelect={handleTimeSelect} // Pass the time selection handler
      />
    </View>
  );
}
