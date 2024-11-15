import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import moment from "moment";
import RepeatModal from "../components/RepeatTask"; // Import the RepeatModal component

const TimeModal = ({ visible, onClose, selectedDate, onTimeSelect }) => {
  const formattedDate = moment(selectedDate).format("D MMMM YYYY");
  const dDay = moment(selectedDate).format("MM/DD/YYYY");
  const currentHour = moment().format("h"); // Current hour in 12-hour format
  const currentMinute = moment().format("mm"); // Current minute
  const currentA = moment().format("A");
  const [hours, setHours] = useState(currentHour);
  const [minutes, setMinutes] = useState(currentMinute);
  const [period, setPeriod] = useState(currentA); // State for AM/PM selection
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [repeatOption, setRepeatOption] = useState("None"); // State to store selected repeat option

  const toggleRepeatModal = () => {
    setRepeatModalVisible(!isRepeatModalVisible);
  };

  const togglePeriod = () => {
    setPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
  };

  const handleHourChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "").slice(0, 2);
    const hourValue = parseInt(numericValue, 10);
    if (hourValue >= 1 && hourValue <= 12) {
      setHours(numericValue);
    } else if (numericValue === "") {
      setHours("");
    }
  };

  const handleMinuteChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "").slice(0, 2);
    const minuteValue = parseInt(numericValue, 10);
    if (minuteValue >= 0 && minuteValue < 60) {
      setMinutes(numericValue);
    } else if (numericValue === "") {
      setMinutes("");
    }
  };

  const handleRepeatSelection = (option) => {
    setRepeatOption(option);
    setRepeatModalVisible(false); // Close the modal after selection
  };

  const handleDone = () => {
    // Construct the selected time string
    const selectedTime = `${hours}:${minutes} ${period}`;
    onTimeSelect(selectedTime); // Call the parent function to pass the time
    onClose(); // Close the modal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[80%] bg-white rounded-lg p-5 shadow-md mx-5 my-5">
          <Text className="text-lg mb-2 font-bold">Set Time</Text>
          <View className="items-center">
            <Text className="text-[#808080] font-semibold text-[15px] mb-2">
              {formattedDate}
            </Text>
            <View className="flex-row items-end">
              <Text className="text-[#646464] font-extrabold text-[40px]">
                {hours}:{minutes} {period}
              </Text>
            </View>
          </View>
          <Text className="mt-10 text-[#686868]">Insert the time</Text>
          <View className="flex-row items-center w-full">
            <View className="flex-col">
              <TextInput
                className="px-2 py-1 border border-gray-300 rounded"
                placeholder="HH"
                keyboardType="numeric"
                maxLength={2}
                value={hours}
                onChangeText={handleHourChange}
                autoFocus // Make this input active
              />
              <Text>hours</Text>
            </View>
            <Text className="items-center mb-5 font-semibold">:</Text>
            <View className="flex-col">
              <TextInput
                className="px-2 py-1 border border-gray-300 rounded"
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
                value={minutes}
                onChangeText={handleMinuteChange}
              />
              <Text>minutes</Text>
            </View>
            <View className="ml-[102] ">
              <TouchableOpacity
                onPress={togglePeriod}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text>{period}</Text>
                <Icon
                  name={period === "AM" ? "arrow-drop-down" : "arrow-drop-up"}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Date */}
          <View className="mt-5 px-2 py-2 flex-row border-t border-gray-200 items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={require("../assets/icons/grayCalendar.png")}
                className="h-[24] w-[24]"
              />
              <Text className="ml-3 text-gray-400 font-semibold">Date</Text>
            </View>
            <TouchableOpacity className="border bg-black p-1 rounded pl-2 pr-2">
              <Text className="text-white text-[12px]">{dDay}</Text>
            </TouchableOpacity>
          </View>

          {/* Display current time */}
          <View className="flex-row justify-end mt-10 mb-5">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-400 font-bold text-[16px]">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-5" onPress={handleDone}>
              <Text className="text-blue-500 font-bold text-[16px]">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimeModal;
