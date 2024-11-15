import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CalendarDropDown() {
  const [showFullMonth, setShowFullMonth] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [range, setRange] = useState("");

  const taskCategories = {
    Personal: "#FF6347",
    Group: "#4682B4",
    Meeting: "#32CD32",
    Event: "#FFD700",
    Work: "#6A5ACD",
  };

  const predefinedTasks = {
    "2024-11-12": [
      { category: "Personal" },
      { category: "Work" },
      { category: "Group" },
    ],
    "2024-11-13": [
      { category: "Meeting" },
      { category: "Work" },
      { category: "Event" },
      { category: "Personal" },
    ],
  };

  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");
  const today = moment();

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
    const newDates = { ...selectedDates };

    if (newDates[dateString]) {
      delete newDates[dateString];
      setSelectedDates(newDates);
      const remainingDates = Object.keys(newDates).map((date) => moment(date));
      if (remainingDates.length > 0) {
        const minDate = moment.min(remainingDates);
        const maxDate = moment.max(remainingDates);
        if (minDate.isSame(maxDate, "day")) {
          setRange(minDate.format("D"));
        } else {
          setRange(`${minDate.format("D")}-${maxDate.format("D")}`);
        }
      } else {
        setRange("");
      }
    } else {
      const selectedDays = Object.keys(selectedDates).map((date) =>
        moment(date)
      );

      if (dayMoment.isSame(today, "day")) {
        setSelectedDates({
          [dateString]: {
            selected: true,
            marked: true,
            selectedColor: "green",
          },
        });
        setRange("");
      } else {
        if (selectedDays.length === 0) {
          newDates[dateString] = {
            selected: true,
            marked: true,
            selectedColor: "blue",
          };
          setSelectedDates(newDates);
          setRange(dayMoment.format("D"));
        } else {
          const minDate = moment.min(selectedDays.concat(dayMoment));
          const maxDate = moment.max(selectedDays.concat(dayMoment));

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
          if (minDate.isSame(maxDate, "day")) {
            setRange(minDate.format("D"));
          } else {
            setRange(`${minDate.format("D")}-${maxDate.format("D")}`);
          }
        }
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-5 mt-3">
      <View className="flex-row items-center justify-between w-full mb-4">
        <Text className="text-xl font-bold">
          {range
            ? `${moment().format(`MMMM`)} ${range}`
            : moment().format("MMMM D")}
        </Text>
        <TouchableOpacity
          onPress={handleToggleMonth}
          style={{ flexDirection: "row", alignItems: "center" }}
          className="border p-2 rounded-full border-gray-300"
        >
          <Icon
            name={showFullMonth ? "chevron-up" : "chevron-down"}
            size={14}
            color={"#8A8A8A"}
          />
        </TouchableOpacity>
      </View>

      {showFullMonth ? (
        <View className="flex-col items-center">
          <Calendar
            current={moment().format("YYYY-MM-DD")}
            markedDates={{
              ...selectedDates,
              [today.format("YYYY-MM-DD")]: {
                selected: true,
                marked: true,
                selectedColor: "#12224F",
                textColor: "white",
              },
              ...Object.keys(selectedDates).reduce((acc, date) => {
                acc[date] = {
                  selected: true,
                  marked: true,
                  selectedColor: "#006A8A",
                  textColor: "white",
                };
                return acc;
              }, {}),
            }}
            onDayPress={onDayPress}
            className="w-[100%]"
          />
        </View>
      ) : (
        <View className="flex-row space-x-2 border p-2 h-[90] w-[110%] items-center rounded-[5px] border-gray-300">
          {daysOfWeek.map((day, index) => (
            <View key={index} className="flex-1 items-center">
              <TouchableOpacity
                onPress={() =>
                  onDayPress({ dateString: day.format("YYYY-MM-DD") })
                }
                className={`flex items-center justify-center rounded-full p-1 ${
                  today.isSame(day, "day")
                    ? "bg-mainBackground p-2 rounded-[5px]"
                    : selectedDates[day.format("YYYY-MM-DD")]
                    ? "bg-blue-300 p-2 rounded-[5px]"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-lg ${
                    today.isSame(day, "day") ||
                    selectedDates[day.format("YYYY-MM-DD")]
                      ? "text-white font-bold"
                      : day.day() === 0
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  {day.format("D")}
                </Text>
                <Text
                  className={`text-sm ${
                    today.isSame(day, "day") ||
                    selectedDates[day.format("YYYY-MM-DD")]
                      ? "text-white"
                      : day.day() === 0
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  {day.format("ddd")}
                </Text>

                {/* Show tasks for the day or N/A if none exist */}
                {predefinedTasks[day.format("YYYY-MM-DD")] &&
                predefinedTasks[day.format("YYYY-MM-DD")].length > 0 ? (
                  <View className="flex-row mt-1">
                    {predefinedTasks[day.format("YYYY-MM-DD")].map(
                      (task, idx) => (
                        <View
                          key={idx}
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: taskCategories[task.category],
                            borderRadius: 2.5,
                            marginHorizontal: 1,
                          }}
                        />
                      )
                    )}
                  </View>
                ) : (
                  <Text className="text-xs text-gray-500 mt-1">N/A</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
