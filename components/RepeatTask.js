import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const RepeatModal = ({ visible, onClose, onSelectRepeat }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[80%] bg-white rounded-lg p-5 shadow-md mx-5 my-5">
          <Text className="text-lg mb-2 font-bold">Repeat Task</Text>
          <Text className="mb-4">Select a repeat option:</Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              onPress={() => onSelectRepeat("Daily")}
              className="py-1 border-b border-gray-200 justify-center border w-[80] items-center rounded-[5px]"
            >
              <Text className="text-gray-500">Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSelectRepeat("Weekly")}
              className="py-1 border-b border-gray-200 justify-center border w-[80] items-center rounded-[5px]"
            >
              <Text className="text-gray-500">Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSelectRepeat("Monthly")}
              className="py-1 border-b border-gray-200 justify-center border w-[80] items-center rounded-[5px]"
            >
              <Text className="text-gray-500">Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSelectRepeat("None")}
              className="py-1 border-b mt-2 border-gray-200 justify-center border w-[80] items-center rounded-[5px]"
            >
              <Text className="text-gray-500">None</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-end mt-5">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-blue-500 font-bold">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RepeatModal;
