import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useNavigation } from "@react-navigation/native";

export default function PostEvent() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [guest, setGuest] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Event categories list
  const categories = [
    "Sports Event",
    "Art Event",
    "Music",
    "College Assembly",
    "Mass",
  ];

  // Load fonts
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  // If fonts are not loaded, show a loading indicator
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const toggleCategory = (category) => {
    setSelectedCategories([category]); // Only keep the current category selected
    setShowDropdown(false); // Close dropdown after selection
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Row */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Post Event</Text>
        <TouchableOpacity style={styles.navPostButton}>
          <Text style={styles.navPostButtonText}>POST</Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your event Title"
        value={eventName}
        onChangeText={setEventName}
      />

      <Text style={styles.label}>Event Category</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text>
          {selectedCategories.length > 0
            ? selectedCategories.join(", ")
            : "Category of event"}
        </Text>
        <Icon
          name={showDropdown ? "chevron-up" : "chevron-down"}
          size={20}
          color="#333"
        />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownMenu}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => toggleCategory(category)}
              >
                <Icon
                  name={
                    selectedCategories.includes(category)
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={20}
                  color="#007bff"
                />
                <Text style={styles.dropdownText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write event Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.photoButton}>
        <Text style={styles.photoButtonText}>
          <Image source={require("./assets/Photo Gallery.png")} />
          Photos
        </Text>
        <Icon
          style={styles.photoButtonIcon}
          name="add-outline"
          size={22}
          color="#888"
        />
      </TouchableOpacity>

      <Text style={styles.label}>Add guests</Text>
      <View style={styles.guestInputContainer}>
        <TextInput
          style={styles.guestInput}
          placeholder="@studentID"
          value={guest}
          onChangeText={setGuest}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Date & Time</Text>
      <View style={styles.dateTimeRow}>
        {/* Date */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {/* Time */}
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
    fontFamily: "DMSans_400Regular", // Apply DMSans as the default font
    paddingHorizontal: 20,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingTop: 10,
    marginLeft: -5,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "DMSans_700Bold",
    marginLeft: -120,
  },
  navPostButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  navPostButtonText: {
    color: "#fff",
    fontFamily: "DMSans_400Regular",
  },
  label: {
    fontSize: 16,
    marginBottom: 7,
    color: "#333",
    fontFamily: "DMSans_700Bold",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontFamily: "DMSans_400Regular",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  dropdownOverlay: {
    position: "absolute",
    top: 263, // Adjust based on where the dropdown should appear
    left: 20,
    right: 20,
    zIndex: 10,
    elevation: 10,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownText: {
    marginLeft: 8,
    fontFamily: "DMSans_400Regular",
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
    fontFamily: "DMSans_400Regular",
    paddingTop: 5,
  },
  photoButton: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  photoButtonText: {
    color: "#888",
    fontFamily: "DMSans_400Regular",
    marginTop: -7,
    marginLeft: -222,
  },
  photoButtonIcon: {
    color: "#888",
    fontFamily: "DMSans_400Regular",
    marginTop: -20,
    paddingLeft: 270,
  },
  guestInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  guestInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontFamily: "DMSans_400Regular",
  },
  addButton: {
    backgroundColor: "#888",
    padding: 11,
    marginLeft: 8,
    borderRadius: 7,
  },
  addButtonText: {
    color: "#fff",
    fontFamily: "DMSans_400Regular",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between", // To align date to the left and time to the right
    marginBottom: 12,
  },
  dateButton: {
    height: 40,
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1, // This makes both buttons take equal width
    marginHorizontal: 7, // Adds space between the date and time buttons
  },
  dateText: {
    fontFamily: "DMSans_400Regular",
    textAlign: "center", // Centers the text within the button
  },
});
