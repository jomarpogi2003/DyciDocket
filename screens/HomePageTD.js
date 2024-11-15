import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans"; // Import the fonts
import { useRoute } from "@react-navigation/native";

export default function EventDetails() {
  const navigation = useNavigation();
  const route = useRoute(); // Access the passed event data
  const { event } = route.params; // Destructure the event object passed from the previous screen

  // Load fonts
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  // If fonts are not loaded, show a loading indicator
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Background Image Container */}
      <ImageBackground
        source={{ uri: event.image }} // Use event.image as the image URL
        style={styles.imageBackground}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={40} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      {/* Bottom White Background Container */}
      <View style={styles.contentContainer}>
        {/* Header with Avatar and Follow Button */}
        <View style={styles.header}>
          <Avatar rounded source={require("./assets/ddp.jpg")} size="small" />
          <Text style={styles.credit}>Posted by:</Text>
          <Text
            style={styles.creditName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {event.creditname.length > 14
              ? event.creditname.substring(0, 14) + "..."
              : event.creditname}
          </Text>
          <Button
            title="Follow"
            buttonStyle={styles.followButton}
            titleStyle={{ fontSize: 12 }}
          />
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {event.title}
        </Text>

        {/* Timestamp and Views */}
        <Text style={styles.timestamp}>
          <Image source={require("./assets/Clock.png")} />
          {event.timeago}
          <Image source={require("./assets/Eye.png")} />
          {event.view} views
        </Text>

        {/* Category Tag */}
        <View style={styles.tag}>
          <Text style={styles.tagText}>{event.type}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{event.description}</Text>

        {/* Event Details */}
        <TouchableOpacity>
          <Text style={styles.linkTitle}>{event.link}</Text>
        </TouchableOpacity>
        <View style={styles.eventDetails}>
          <Text style={styles.eventLabel1}>
            <Image source={require("./assets/Baby Calendar.png")} /> Date of
            Event:
          </Text>
          <Text style={styles.eventValue}>{event.date}</Text>
          <Text style={styles.eventLabel2}>
            <Image source={require("./assets/Clock.png")} /> Time of Event:
          </Text>
          <Text style={styles.eventValue}>
            {event.timefrom} - {event.timeto}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    fontFamily: "DMSans_400Regular", // Apply DMSans as the default font
  },
  imageBackground: {
    width: "100%",
    height: 380,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(175, 175, 175, 0.7)", // Light gray with 30% opacity
    borderRadius: 50, // Border radius of 50 to keep it circular
    padding: 4, // Increase padding to make the button bigger
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  credit: {
    left: -9,
    fontSize: 12,
    color: "#B6B6B6",
    fontFamily: "DMSans_400Regular", // Apply DMSans font
  },
  creditName: {
    left: -20,
    maxWidth: 120,
    fontSize: 12,
    color: "#000",
    fontFamily: "DMSans_700Bold", // Apply DMSans font
  },
  followButton: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#007bff",
    borderRadius: 8,
    fontFamily: "DMSans_400Regular", // Apply DMSans font
  },
  title: {
    fontSize: 22,
    color: "#333",
    marginTop: 5,
    marginBottom: 4,
    marginLeft: 10,
    fontFamily: "DMSans_700Bold", // Apply DMSans Bold font
  },
  timestamp: {
    fontSize: 12,
    color: "#B6B6B6",
    marginBottom: 10,
    marginLeft: 10,
    fontFamily: "DMSans_400Regular", // Apply DMSans font
  },
  tag: {
    paddingLeft: 7,
    marginTop: 4,
    marginBottom: 11,
  },
  tagText: {
    backgroundColor: "#2e2e4e", // Default gray color for unselected categories
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginHorizontal: 4,
    alignSelf: "flex-start", // Aligns the box to the left based on content width
    color: "#fff",
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
    fontFamily: "DMSans_400Regular", // Apply DMSans font
    paddingHorizontal: 10,
  },
  linkTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007bff",
    fontFamily: "DMSans_700Bold", // Apply DMSans Bold font
    textDecorationLine: "underline",
    paddingLeft: 10,
    marginBottom: 5,
  },
  eventDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  eventLabel1: {
    fontSize: 14,
    color: "#A9A9A9",
    width: "50%",
    fontFamily: "DMSans_400Regular", // Apply DMSans font
    paddingTop: 10,
  },
  eventLabel2: {
    fontSize: 14,
    color: "#A9A9A9",
    width: "50%",
    fontFamily: "DMSans_400Regular", // Apply DMSans font
    paddingTop: 10,
    paddingLeft: 1,
  },
  eventValue: {
    fontSize: 14,
    color: "#000",
    width: "50%",
    fontFamily: "DMSans_400Regular", // Apply DMSans font
    textAlign: "right",
    paddingTop: 15,
    textDecorationLine: "underline",
  },
});
