import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Comment } from "../../components/TaskOverViewComponents/Comment";
import { Location } from "../../components/TaskOverViewComponents/MeetingLocation";

const TaskDetailRow = ({ label, value }) => (
  <View className="flex-row items-center mt-5">
    <View className="flex-row items-center">
      <Text className="font-medium text-black text-[15px]">{label}</Text>
    </View>
    <View className="flex-row items-center ml-10">{value}</View>
  </View>
);

const TaskOverViewModal = ({ visible, task, onClose }) => {
  const [showComment, setShowComment] = useState(true);
  const [showLocation, setShowLocation] = useState(false);

  if (!task) return null;

  // Determine if the task should show location and comment sections
  const shouldShowLocation = task.category === "MEETING TASK";
  const shouldShowComment = [
    "GROUP TASK",
    "WORK TASK",
    "EVENT TASK",
    "MEETING TASK",
  ].includes(task.category); // Show comments for specific categories

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end items-center bg-black/50">
        <View className="bg-white w-full h-full">
          <View className="justify-between flex-row mx-5 my-5">
            <TouchableOpacity className="p-2 rounded-[5px] border border-gray-300 flex-row items-center">
              <Icon name={"check"} size={15} color={"#000"} />
              <Text className="ml-2 text-[14px]">Mark Complete</Text>
            </TouchableOpacity>

            {/* Back Container */}
            <TouchableOpacity
              className="p-2 rounded-full bg-gray-100"
              onPress={onClose}
            >
              <Icon name={"x"} size={18} color={"#000"} />
            </TouchableOpacity>
          </View>
          {/* Line Separator */}
          <View className="border-b border-gray-200 mt-5"></View>
          {/* Fetching the data */}
          <Text className="mt-5 text-[20px] font-medium ml-5">
            {task.title}
          </Text>
          {/* Data Container */}
          <View className="mx-5 mt-5">
            <TaskDetailRow
              label={"Assignee"}
              value={
                task.category === "PERSONAL" && task.participantsCount === 0 ? (
                  <Text className="text-gray-400">No participants</Text>
                ) : (
                  <>
                    {task.participants.slice(0, 2).map((participant, index) => (
                      <Image
                        key={index}
                        source={participant}
                        className="w-[24px] h-[24px] rounded-full mr-[1px]"
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
            {/* Due Date */}
            <TaskDetailRow
              label={"Due Date"}
              value={
                <View className="flex-row items-center">
                  <View className="border p-2 rounded-full border-gray-400">
                    <Icon name={"calendar"} size={18} color={"#999999"} />
                  </View>
                  <Text className="ml-2 font-semibold text-gray-500">
                    {task.taskOverViewDate}
                  </Text>
                </View>
              }
            />
            {/* Projects Date */}
            <TaskDetailRow
              label={"Projects"}
              value={
                <View className="flex-row items-center">
                  <View className="border rounded-[5px] border-gray-200">
                    <View className="flex-row items-center">
                      <View className="p-4 border-r border-gray-200 flex-row w-[110px]">
                        <Icon name={"pie-chart"} size={18} color="#999999" />
                        <Text className="ml-3">Status</Text>
                      </View>
                      <View>
                        <Text
                          className={`ml-4 ${task.statusColor} p-2 w-[100px] text-center rounded-[15px] text-[12px] font-semibold mr-4`}
                        >
                          {task.status}
                        </Text>
                      </View>
                    </View>
                    {/* Category */}
                    <View className="flex-row items-center border-t border-gray-200">
                      <View className="p-4 border-r border-gray-200 flex-row w-[110px]">
                        <Icon name={"tag"} size={18} color="#999999" />
                        <Text className="ml-3">Category</Text>
                      </View>
                      <View
                        className={`flex-row justify-center items-center ml-4 rounded-[10px] ${task.categoryColor} p-2 pr-3 w-[100px]`}
                      >
                        <Image
                          source={task.categoryIcon}
                          className={`${task.categoryIconSize} mr-1`}
                        />
                        <Text className="text-[12px] font-medium">
                          {task.category}
                        </Text>
                      </View>
                    </View>
                    {/* Type */}
                    <View className="flex-row items-center border-t border-gray-200">
                      <View className="p-4 border-r border-gray-200 flex-row w-[110px]">
                        <Icon name={"grid"} size={18} color="#999999" />
                        <Text className="ml-3">Type</Text>
                      </View>
                      <View
                        className={`flex-row justify-center items-center ml-4 rounded-[10px] ${task.typeColor} p-2 pr-3 w-[100px]`}
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
                    </View>
                  </View>
                </View>
              }
            />
            <TaskDetailRow label={"Description"} />
            <View className="mt-2">
              <Text className="text-[14px] mt-2 font-regular text-gray-400 border-b border-gray-100 pb-5">
                {task.description}
              </Text>
            </View>
            {/* Filter Tabs */}
            <View className="flex-row justify-around mt-4">
              {shouldShowComment && (
                <TouchableOpacity
                  onPress={() => {
                    setShowComment(true);
                    setShowLocation(false);
                  }}
                  className={`flex-1 mx-1 px-4 py-2 ${
                    showComment
                      ? "border-b-2 border-blue-900"
                      : "border border-transparent"
                  }`}
                >
                  <Text
                    className={`text-sm text-center ${
                      showComment
                        ? "text-blue-900 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    Comment
                  </Text>
                </TouchableOpacity>
              )}
              {shouldShowLocation && (
                <TouchableOpacity
                  onPress={() => {
                    setShowLocation(true);
                    setShowComment(false);
                  }}
                  className={`flex-1 mx-1 px-4 py-2 ${
                    showLocation
                      ? "border-b-2 border-blue-900"
                      : "border border-transparent"
                  }`}
                >
                  <Text
                    className={`text-sm text-center ${
                      showLocation
                        ? "text-blue-900 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    Location
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* Conditional Content */}
            <View className="mt-4 mx-4" style={{ height: 200 }}>
              <ScrollView style={{ maxHeight: 200 }}>
                {showComment && shouldShowComment && <Comment />}
                {showLocation && shouldShowLocation && <Location />}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskOverViewModal;
