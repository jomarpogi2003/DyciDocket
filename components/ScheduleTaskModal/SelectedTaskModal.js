import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Comment } from "../../components/TaskOverViewComponents/Comment";
import { Location } from "../../components/TaskOverViewComponents/MeetingLocation";
import { SubTask } from "../../components/TaskOverViewComponents/SubTask";

const TaskDetailRow = ({ icon, label, value }) => (
  <View className="flex-row items-center justify-between mt-3">
    <View className="flex-row items-center">
      <Image source={icon} className="h-[18px] w-[18px]" />
      <Text className="ml-2 font-medium text-gray-400 text-[13px]">
        {label}
      </Text>
    </View>
    <View className="flex-row items-center">{value}</View>
  </View>
);

const SelectedTaskModal = ({ visible, task, onClose }) => {
  const [showComment, setShowComment] = useState(true);
  const [showLocation, setShowLocation] = useState(false);
  const [showSubTask, setShowSubTask] = useState(false);

  if (!task) return null;

  const statusText = task.isCompleted ? "Task Done" : "Ongoing";
  const filters = [
    {
      name: "Comment",
      toggle: () => {
        setShowComment(true);
        setShowLocation(false);
        setShowSubTask(false);
      },
    },
    {
      name: "Location",
      toggle: () => {
        setShowLocation(true);
        setShowComment(false);
        setShowSubTask(false);
      },
    },
    {
      name: "SubTask",
      toggle: () => {
        setShowSubTask(true);
        setShowComment(false);
        setShowLocation(false);
      },
    },
  ];

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end items-center bg-black/50">
        <View className="w-full h-[92%] p-5 bg-white rounded-xl">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("../../assets/icons/BackBlue.png")}
                className="h-[24px] w-[24px] mr-5"
              />
            </TouchableOpacity>
            <Text className="text-lg font-semibold">Task Overview</Text>
          </View>
          <ScrollView
            className="mt-4"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text className="text-xl font-semibold">{task.title}</Text>
            <Text className="text-[14px] mt-2 font-regular text-gray-400 border-b border-gray-100 pb-5">
              {task.description}
            </Text>
            <View className="flex-col mt-5">
              <TaskDetailRow
                icon={require("../../assets/icons/TaskOverViewIcons/status.png")}
                label="Status"
                value={
                  <View
                    className={`bg-StatusBgOngoing items-center rounded-full justify-center h-[27px] w-[81px]`}
                  >
                    <Text className="text-StatusFontColor">{statusText}</Text>
                  </View>
                }
              />
              <TaskDetailRow
                icon={require("../../assets/icons/TaskOverViewIcons/date.png")}
                label="Due Date"
                value={
                  <Text className="text-black font-medium">
                    {task.taskOverViewDate}
                  </Text>
                }
              />
              <TaskDetailRow
                icon={require("../../assets/icons/TaskOverViewIcons/assign.png")}
                label="Assignee"
                value={
                  task.category === "PERSONAL" &&
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
                        <Text className="text-[12px] font-medium text-gray-400 ml-2">
                          +{task.participantsCount - 2} Member
                          {task.participantsCount - 2 > 1 ? "s" : ""}
                        </Text>
                      )}
                    </>
                  )
                }
              />
              <TaskDetailRow
                icon={require("../../assets/icons/TaskOverViewIcons/tag.png")}
                label="Category"
                value={
                  <View
                    className={`flex-row justify-center px-2 py-1 rounded-[5px] ${task.categoryColor}`}
                  >
                    <Image
                      source={task.categoryIcon}
                      className={`${task.categoryIconSize} mr-1`}
                    />
                    <Text className="text-[12px] font-medium">
                      {task.category}
                    </Text>
                  </View>
                }
              />
              <TaskDetailRow
                icon={require("../../assets/icons/TaskOverViewIcons/Type.png")}
                label="Type"
                value={
                  <View
                    className={`flex-row justify-center px-2 py-1 rounded-[5px] ${task.typeColor}`}
                  >
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
                }
              />
              {/* Attachment Row */}
              {task.attachment && task.attachment.uri && (
                <TaskDetailRow
                  icon={require("../../assets/icons/TaskOverViewIcons/attachment.png")}
                  label="Attachment"
                  value={
                    <Image
                      source={{ uri: task.attachment.uri }}
                      className="h-[50px] w-[50px] rounded m-[1px]"
                    />
                  }
                />
              )}
            </View>
            {/* Button Section */}
            <View className="flex-row justify-around mt-4">
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.name}
                  onPress={filter.toggle}
                  className={`flex-1 mx-1 px-4 py-2 ${
                    (showComment && filter.name === "Comment") ||
                    (showLocation && filter.name === "Location") ||
                    (showSubTask && filter.name === "SubTask")
                      ? "border-b-2 border-blue-900"
                      : "border border-transparent"
                  }`}
                >
                  <Text
                    className={`text-sm text-center ${
                      (showComment && filter.name === "Comment") ||
                      (showLocation && filter.name === "Location") ||
                      (showSubTask && filter.name === "SubTask")
                        ? "text-blue-900 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="border-b border-gray-100"></View>
            <View className="mt-4 mx-4" style={{ height: 200 }}>
              {/* Adjust height as necessary */}
              <ScrollView style={{ maxHeight: 200 }}>
                {/* Set a maximum height to allow scrolling */}
                {showComment && <Comment />}
                {showLocation && <Location />}
                {showSubTask && <SubTask />}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SelectedTaskModal;
