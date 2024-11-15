import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";
import SelectedTaskModal from "../components/ScheduleTaskModal/SelectedTaskModal";
import { SubTask } from "../components/TaskOverViewComponents/SubTask";
import { useNavigation } from "@react-navigation/native";
import TaskOverViewModal from "../components/ScheduleTaskModal/TaskOverViewModal";
import Icon from "react-native-vector-icons/Feather";
import Calendar from "../components/Calendar";
const taskCategories = [
  {
    title: "Personal",
    icon: require("../assets/icons/Black/Personal.png"),
    activeIcon: require("../assets/icons/White/Personal.png"),
  },
  {
    title: "Group",
    icon: require("../assets/icons/Black/Group.png"),
    activeIcon: require("../assets/icons/White/Group.png"),
  },
  {
    title: "Meeting",
    icon: require("../assets/icons/Black/Meeting.png"),
    activeIcon: require("../assets/icons/White/Meeting.png"),
  },
  {
    title: "Work",
    icon: require("../assets/icons/Black/Work.png"),
    activeIcon: require("../assets/icons/White/Work.png"),
  },
  {
    title: "Event",
    icon: require("../assets/icons/Black/Event.png"),
    activeIcon: require("../assets/icons/White/Event.png"),
  },
];

const tasks = [
  {
    category: "GROUP TASK",
    status: "In Progress",
    statusColor: "bg-statusColor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    categoryIcon: require("../assets/icons/group.png"),
    categoryIconSize: "h-[15px] w-[15px]",
    categoryColor: "bg-GroupTaskBg",
    type: "PLANNING",
    typeFontColor: "text-PlanningFontColor",
    typeIcon: require("../assets/icons/type/GroupPlanning.png"),
    typeIconSize: "h-[13px] w-[13px]",
    typeColor: "bg-purple-200",
    title: "UI/UX Designing Group 1",
    dueDate: "Due Date 10 October 2024",
    taskOverViewDate: "10 October 2024",
    participants: [
      require("../assets/img/profileWinter.png"),
      require("../assets/img/profileWinter.png"),
      require("../assets/img/profileWinter.png"),
    ],
    participantsCount: 3,
    attachment: {
      name: "Design Mockup",
      type: "image/png",
      uri: "https://i.pinimg.com/736x/e6/65/d4/e665d465f928f5752b0833b1a9cc1e8b.jpg", // URL to the attachment
    },
  },
  {
    category: "PERSONAL",
    status: "In Progress",
    statusColor: "bg-statusColor",
    description:
      "This task is for personal development and should be completed by the end of the month.",
    categoryIcon: require("../assets/icons/personal.png"),
    categoryColor: "bg-green-200",
    categoryIconSize: "h-[12px] w-[12px]",
    type: "HOBBIES",
    typeFontColor: "text-yellow-700",
    typeIcon: require("../assets/icons/type/Hobbies.png"),
    typeColor: "bg-yellow-200",
    typeIconSize: "h-[15px] w-[15px]",
    title: "Finalize Quarterly Report",
    dueDate: "Due Date 10 October 2024",
    taskOverViewDate: "10 October 2024",
    participants: [], // No participants
    participantsCount: 0, // Count is zero
    attachment: null, // No attachment
  },
];
export default function ScheduleScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigation = useNavigation(); // Hook to get the navigation prop

  const handleNavigate = () => {
    navigation.navigate("Notification"); // Navigate to the desired screen
  };
  const openModal = (tasks) => {
    setSelectedTask(tasks);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };
  const user = {
    profile: {
      firstName: "Jomar",
      lastName: "Soliman",
      fullname: "Jomar Soliman",
      profilePicture: require("../assets/img/profileWinter.png"),
    },
  };

  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [activeCategories, setActiveCategories] = useState([]); // State to track active categories

  const weeks = React.useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");
    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");
        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
    <SafeAreaView className="flex-1 mt-10 bg-white">
      <ScrollView>
        <View className="flex-1 bg-white mx-5 mb-20">
          <View className="flex-row justify-between items-center mt-5">
            <View className="flex-row items-center">
              <Image
                source={user.profile.profilePicture}
                style={{ width: 40, height: 40, borderRadius: 50 }}
                className="mr-3"
              />
              <View className="flex-col">
                <Text className="text-[16px] font-medium mb-1">
                  {user.profile.fullname}
                </Text>
                <Text className="text-[15px] font-medium text-gray-600">
                  Good Morning, {user.profile.firstName}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleNavigate}>
              <Image
                source={require("../assets/icons/notificationGray.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <Calendar
            value={value}
            setValue={setValue}
            week={week}
            setWeek={setWeek}
          />

          {/* Task Categories */}
          <View className="mt-5 ml-2">
            <Text className="font-medium text-[15px]">Task Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              {taskCategories.map((category, index) => {
                const isActive = activeCategories.includes(category.title);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (isActive) {
                        setActiveCategories(
                          activeCategories.filter(
                            (item) => item !== category.title
                          )
                        );
                      } else {
                        setActiveCategories([
                          ...activeCategories,
                          category.title,
                        ]);
                      }
                    }}
                    className={`w-[110px] h-[38px] flex-row items-center justify-center rounded-md mr-3 shadow-md mt-3 ${
                      isActive
                        ? "border border-gray-200 bg-mainBackground"
                        : "border border-gray-200 bg-white"
                    }`}
                  >
                    <View
                      className={`rounded-full border h-3 w-3 mr-1 left-[-1] ${
                        isActive ? "border-white" : "border-gray-400"
                      }`}
                    />
                    <Image
                      source={isActive ? category.activeIcon : category.icon}
                      style={{ width: 12, height: 12, marginRight: 5 }}
                    />
                    <Text
                      className={`font-medium ${
                        isActive ? "text-white" : "text-black"
                      }`}
                    >
                      {category.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Agenda task record holder */}
          <View>
            <View className="justify-between items-center flex-row mx-3 mt-5">
              <Text className="font-semibold ">Agenda</Text>
              <TouchableOpacity>
                <Image
                  source={require("../assets/asc.png")}
                  className="w-[13px] h-[12px]"
                />
              </TouchableOpacity>
            </View>
            {/* Cards for Each Task */}
            {tasks.map((task, index) => (
              <TouchableOpacity
                key={index}
                className="border border-gray-200 h-[170px] w-[285px] rounded-lg ml-4 mt-5"
                onPress={() => openModal(task)}
              >
                {/* Category and Type Container */}
                <View className="flex-row mt-4 ml-4">
                  <View
                    className={`flex-row justify-center px-2 py-1 rounded-[5px] ${task.categoryColor}`}
                  >
                    {/* Category */}
                    <Image
                      source={task.categoryIcon}
                      className={`${task.categoryIconSize} mr-1`}
                    />
                    <Text className="text-[12px] font-medium">
                      {task.category}
                    </Text>
                  </View>
                  <View
                    className={`flex-row justify-center px-2 py-1 rounded-[5px] ${task.typeColor} ml-2`}
                  >
                    {/* Type */}
                    <Image
                      source={task.typeIcon}
                      className={`${task.typeIconSize} mr-1`}
                    />
                    <Text
                      className={`${task.typeFontColor} text-[12px] font-medium`}
                    >
                      {task.type}
                    </Text>
                  </View>
                </View>
                {/* Title and Due Date */}
                <View className="mt-4 mx-5">
                  <Text className="text-[20px] font-medium mb-2">
                    {task.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Image
                      source={require("../assets/icons/cal.png")}
                      className="w-[23px] h-[23px] mr-2"
                    />
                    <Text className="text-[16px] font-regular text-gray-400">
                      {task.dueDate}
                    </Text>
                  </View>
                </View>
                {/* Participants */}
                <View className="flex-row items-center justify-start mx-5 mt-4">
                  {task.category === "PERSONAL" &&
                  task.participantsCount === 0 ? (
                    <Text className="text-gray-400">No participants</Text>
                  ) : (
                    <>
                      {task.participants
                        .slice(0, 2)
                        .map((participant, index) => (
                          <Image
                            key={index}
                            source={participant}
                            className="w-[24px] h-[24px] rounded-full m-[1px]"
                          />
                        ))}
                      {task.participantsCount > 2 && (
                        <View className="ml-2">
                          <Text className="text-[12px] font-medium text-gray-400">
                            +{task.participantsCount - 2} Member
                            {task.participantsCount - 2 > 1 ? "s" : ""}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            {/* End of Cards for Each Task 
            <SelectedTaskModal
              visible={modalVisible}
              task={selectedTask}
              onClose={closeModal}
            />*/}
            <TaskOverViewModal
              visible={modalVisible}
              task={selectedTask}
              onClose={closeModal}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
