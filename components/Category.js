import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function CategoryButton({
  title,
  color,
  icon,
  onPress,
  isSelected,
}) {
  const handlePress = () => {
    console.log(`${title} button clicked NIGGA!`);
    onPress();
  };

  const containerStyles = [
    "flex-row",
    "items-center",
    "rounded-lg",
    "px-3",
    "py-2.5",
    "mx-1.5",
    "mb-2",
    "border-2",
    isSelected ? "border-2" : "border-0",
  ];

  const textStyles = [
    "font-medium",
    "text-[10px]",
    isSelected ? `text-${color.text}` : `text-[${color.text}]`,
  ];

  const containerSize = {
    Group: "w-[80] h-[34] pb-2",
    Personal: "w-[88] h-[34] pb-2",
    Work: "w-[88] h-[34] pb-2",
    Event: "w-[80] h-[34] pb-2",
    Meeting: "w-[88] h-[34] pb-2",
  };

  return (
    <TouchableOpacity
      onPress={handlePress} // Use the new handlePress function
      className={[containerStyles.join(" "), containerSize[title]].join(" ")}
      style={{
        backgroundColor: isSelected ? color.background : color.background,
        borderColor: isSelected ? color.border : "transparent",
        borderRadius: 10,
      }}
    >
      <Image source={icon} className="w-[12] h-[12] mr-2" />
      <Text className={textStyles.join(" ")}>{title}</Text>
    </TouchableOpacity>
  );
}
