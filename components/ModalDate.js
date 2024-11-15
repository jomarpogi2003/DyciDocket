import React, { useState } from "react";
import { Modal, Text, View, TouchableOpacity, Image } from "react-native";
import Calendar from "react-native-calendars/src/calendar";
import { TouchableWithoutFeedback } from "react-native";
import TimeModal from "../components/TimeModal"; // Adjust the import path as necessary
import RepeatModal from "../components/RepeatTask"; // Import the RepeatModal component

const dateOptions = [
  "No Date",
  "Today",
  "Tomorrow",
  "This Sunday",
  "3 Days Later",
];

// Helper functions to get specific dates
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const getSundayDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSunday = (7 - dayOfWeek) % 7;
  today.setDate(today.getDate() + daysUntilSunday);
  return today.toISOString().split("T")[0];
};

const getDateAfterDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const ModalDate = ({ visible, onClose, onSelectDate, onSelectRepeat }) => {
  const todayDate = getTodayDate();
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [selectedOption, setSelectedOption] = useState("Today");
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [repeatOption, setRepeatOption] = useState("None");
  const [selectedTime, setSelectedTime] = useState("None");

  const handleRepeatSelection = (option) => {
    setRepeatOption(option);
    onSelectRepeat(option);
    setRepeatModalVisible(false);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedOption("Custom Date");
  };

  const handleOptionSelect = (option) => {
    let newDate = "";
    switch (option) {
      case "No Date":
        newDate = "";
        break;
      case "Today":
        newDate = todayDate;
        break;
      case "Tomorrow":
        newDate = getTomorrowDate();
        break;
      case "This Sunday":
        newDate = getSundayDate();
        break;
      case "3 Days Later":
        newDate = getDateAfterDays(3);
        break;
      default:
        newDate = todayDate;
        break;
    }
    setSelectedDate(newDate);
    setSelectedOption(option);
  };

  const handleTimeSelection = () => {
    setTimeModalVisible(true);
  };

  const handleTimeModalClose = (time) => {
    if (time) {
      setSelectedTime(time);
    }
    setTimeModalVisible(false);
  };

  const handleDone = () => {
    onSelectDate(selectedDate, repeatOption, selectedTime);
    onClose();
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
          <Text className="text-lg mb-2">Set Date & Time</Text>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [todayDate]: {
                selected: selectedDate === todayDate,
                selectedColor: "#4CAF50",
                selectedTextColor: "#ffffff",
              },
              [selectedDate]: {
                selected: true,
                selectedColor: "#ff6347",
                selectedTextColor: "#ffffff",
              },
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              todayTextColor: "#4CAF50",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#ff6347",
              selectedDotColor: "#ffffff",
              arrowColor: "#ff6347",
              monthTextColor: "#2d4150",
              indicatorColor: "#ff6347",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
            dayComponent={({ date, state }) => {
              const isSunday = new Date(date.dateString).getDay() === 0;
              const isSelected = date.dateString === selectedDate;
              const isToday = date.dateString === todayDate;

              return (
                <TouchableWithoutFeedback onPress={() => handleDayPress(date)}>
                  <View
                    className={`rounded-full p-2 ${
                      isSelected
                        ? "bg-red-600"
                        : isToday
                        ? "bg-green-500"
                        : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`${
                        isSunday
                          ? "text-red-500"
                          : isSelected || isToday
                          ? "text-white"
                          : state === "disabled"
                          ? "text-gray-300"
                          : "text-gray-700"
                      } font-semibold`}
                    >
                      {date.day}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />

          <View className="mt-5 px-3 py-2 flex-row flex-wrap border-t border-gray-200">
            {dateOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`border rounded-md px-2 py-1 mr-2 mb-2 ${
                  selectedOption === option
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 bg-gray-50"
                }`}
                onPress={() => handleOptionSelect(option)}
              >
                <Text
                  className={`text-sm ${
                    selectedOption === option
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-1 px-2 py-2 flex-row border-t border-gray-200 items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={require("../assets/icons/timeGray.png")}
                className="h-[24] w-[24]"
              />
              <Text className="ml-3 text-gray-400 font-semibold">Time</Text>
            </View>
            <TouchableOpacity onPress={handleTimeSelection}>
              <Text className="text-gray-500">{selectedTime}</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-end mt-10 mb-5">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-400 font-bold text-[16px]">Close</Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-5" onPress={handleDone}>
              <Text className="text-blue-500 font-bold text-[16px]">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TimeModal
        visible={timeModalVisible}
        onClose={() => setTimeModalVisible(false)}
        onTimeSelect={handleTimeModalClose}
        selectedDate={selectedDate}
      />
    </Modal>
  );
};

// Set default props to avoid errors if not provided
ModalDate.defaultProps = {
  onSelectRepeat: () => {},
};

export default ModalDate;
