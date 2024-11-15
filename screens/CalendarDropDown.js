import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars"; // Import Calendar from the library
import moment from "moment"; // Make sure to install moment.js
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

export default function CalendarDropDown() {
  const [showFullMonth, setShowFullMonth] = useState(false);
  const [selectedDates, setSelectedDates] = useState({}); // Object to track selected dates
  const [range, setRange] = useState(""); // To track the selected range

  // Calculate the current week
  const startOfWeek = moment().startOf("week"); // Sunday
  const endOfWeek = moment().endOf("week"); // Saturday
  const today = moment();

  // Generate the days of the week
  const daysOfWeek = [];
  for (
    let day = startOfWeek;
    day.isBefore(endOfWeek, "day");
    day.add(1, "days")
  ) {
    daysOfWeek.push(day.clone());
  }

  const handleToggleMonth = () => {
    setShowFullMonth(!showFullMonth);
  };

  const onDayPress = (day) => {
    const dateString = day.dateString;
    const dayMoment = moment(dateString);

    // Check if a date is already selected
    if (selectedDates[dateString]) {
      // If it's already selected, deselect it
      const newDates = { ...selectedDates };
      delete newDates[dateString];
      setSelectedDates(newDates);
      setRange(""); // Reset range on deselect
    } else {
      // If it's not selected, we need to establish a range
      const selectedDays = Object.keys(selectedDates).map((date) =>
        moment(date)
      );

      // If there are no already selected dates, just select this one
      if (selectedDays.length === 0) {
        setSelectedDates({
          [dateString]: { selected: true, marked: true, selectedColor: "blue" },
        });
        setRange(dayMoment.format("D")); // Set range to just this day
      } else {
        // If there are already selected dates, find the min and max
        const minDate = moment.min(selectedDays.concat(dayMoment));
        const maxDate = moment.max(selectedDays.concat(dayMoment));

        // Create a new selected dates range
        const newDates = {};
        for (
          let date = minDate.clone();
          date.isBefore(maxDate.clone().add(1, "days"), "day");
          date.add(1, "days")
        ) {
          newDates[date.format("YYYY-MM-DD")] = {
            selected: true,
            marked: true,
            selectedColor: "blue",
          };
        }

        setSelectedDates(newDates);
        setRange(`${minDate.format("D")}-${maxDate.format("D")}`); // Set range
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-5">
      {/* Header with month label and toggle button */}
      <View className="flex-row items-center justify-between w-full mb-4">
        <Text className="text-xl font-bold">
          {moment().format("MMMM D")} {/* Format as MonthName Day */}
        </Text>
        <TouchableOpacity
          onPress={handleToggleMonth}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text className="mr-2">{showFullMonth ? "Hide" : "Show"}</Text>
          <Icon
            name={showFullMonth ? "chevron-up" : "chevron-down"}
            size={20}
          />
        </TouchableOpacity>
      </View>
      {/* Range display */}
      {range && <Text className="text-lg mb-4">Selected Range: {range}</Text>}

      {showFullMonth ? (
        <View className="flex-col items-center">
          <Calendar
            current={moment().format("YYYY-MM-DD")}
            markedDates={selectedDates} // Use selected dates for marking
            onDayPress={onDayPress}
            style={{ width: "100%" }} // Full width
          />
        </View>
      ) : (
        <View className="flex-row space-x-4">
          {daysOfWeek.map((day, index) => (
            <View key={index} className="flex-1 items-center">
              <Text
                onPress={() =>
                  onDayPress({ dateString: day.format("YYYY-MM-DD") })
                } // Add onPress to select
                className={`text-lg cursor-pointer ${
                  today.isSame(day, "day")
                    ? "text-blue-500 font-bold"
                    : selectedDates[day.format("YYYY-MM-DD")]
                    ? "text-blue-500 font-bold"
                    : "text-black"
                }`}
              >
                {day.format("D")} {/* Display the date */}
              </Text>
              <Text className="text-sm text-gray-500">
                {day.format("ddd")} {/* Display the day name */}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
