import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const notifications = [
  {
    id: 1,
    user: "Winter Cute",
    action: "marked as completed the",
    task: "Go to Wright Park subtask in Outing...",
    buttonText: "Visit",
    timestamp: "Today",
    avatar:
      "https://preview.redd.it/why-wall-ilumination-thinks-its-a-whatsapp-default-profile-v0-5vsjfcznlwld1.png?width=360&format=png&auto=webp&s=29beb16ce4bce926b91bd2391ef854b9b103f831",
  },
  {
    id: 2,
    user: "Sana Minatozaki",
    action: "invited you to join their",
    task: "Capstone task",
    buttonText: "Join",
    timestamp: "Today",
    avatar:
      "https://preview.redd.it/why-wall-ilumination-thinks-its-a-whatsapp-default-profile-v0-5vsjfcznlwld1.png?width=360&format=png&auto=webp&s=29beb16ce4bce926b91bd2391ef854b9b103f831",
  },
  {
    id: 3,
    user: "Yu Ji-min",
    action: "started following you.",
    buttonText: "Follow",
    timestamp: "Yesterday",
    avatar:
      "https://preview.redd.it/why-wall-ilumination-thinks-its-a-whatsapp-default-profile-v0-5vsjfcznlwld1.png?width=360&format=png&auto=webp&s=29beb16ce4bce926b91bd2391ef854b9b103f831",
  },
  {
    id: 4,
    user: "Kim Min-jeong",
    action: "started following you.",
    buttonText: "Following",
    timestamp: "Yesterday",
    avatar:
      "https://preview.redd.it/why-wall-ilumination-thinks-its-a-whatsapp-default-profile-v0-5vsjfcznlwld1.png?width=360&format=png&auto=webp&s=29beb16ce4bce926b91bd2391ef854b9b103f831",
  },
  {
    id: 5,
    user: "Alice Johnson",
    action: "completed the task",
    task: "Write a report on Q3 results",
    buttonText: "View",
    timestamp: "Last 7 days",
    avatar:
      "https://preview.redd.it/why-wall-ilumination-thinks-its-a-whatsapp-default-profile-v0-5vsjfcznlwld1.png?width=360&format=png&auto=webp&s=29beb16ce4bce926b91bd2391ef854b9b103f831",
  },
  {
    id: 6,
    user: "John Doe",
    action: "commented on your post.",
    task: "Great job on the project!",
    buttonText: "View",
    timestamp: "This Month",
    avatar:
      "https://preview.redd.it/why-wall-ilumination-thinks-its-a-whatsapp-default-profile-v0-5vsjfcznlwld1.png?width=360&format=png&auto=webp&s=29beb16ce4bce926b91bd2391ef854b9b103f831",
  },
  {
    id: 7,
    user: "Michael Brown",
    action: "added a new comment to your task",
    task: "Prepare presentation for client meeting",
    buttonText: "View",
    timestamp: "This Month",
    avatar:
      "https://preview.redd.it/why-wall-ilumination-thinks-its-a-whatsapp-default-profile-v0-5vsjfcznlwld1.png?width=360&format=png&auto=webp&s=29beb16ce4bce926b91bd2391ef854b9b103f831",
  },
  {
    id: 8,
    user: "Emma Wilson",
    action: "requested an update on",
    task: "Budget planning for next quarter",
    buttonText: "Respond",
    timestamp: "This Month",
    avatar:
      "https://preview.redd.it/why-wall-ilumination-thinks-its-a-whatsapp-default-profile-v0-5vsjfcznlwld1.png?width=360&format=png&auto=webp&s=29beb16ce4bce926b91bd2391ef854b9b103f831",
  },
];

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Notification</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {["Today", "Yesterday", "Last 7 days", "This Month"].map((section) => (
          <View key={section}>
            <Text style={styles.sectionTitle}>{section}</Text>
            {notifications
              .filter((item) => item.timestamp === section)
              .map((notification) => (
                <View key={notification.id} style={styles.notificationItem}>
                  <Image
                    source={{ uri: notification.avatar }}
                    style={styles.avatar}
                  />
                  <View style={styles.textContainer}>
                    <Text
                      style={styles.notificationText}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      <Text style={styles.userName}>{notification.user}</Text>{" "}
                      {notification.action}
                      {notification.task && (
                        <Text
                          style={styles.task}
                        >{` '${notification.task}'`}</Text> // Added quotes around task
                      )}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={
                      notification.buttonText === "Following"
                        ? styles.followingButton
                        : styles.actionButton
                    }
                  >
                    <Text
                      style={
                        notification.buttonText === "Following"
                          ? styles.followingButtonText
                          : styles.actionButtonText
                      }
                    >
                      {notification.buttonText}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  backButton: {
    marginTop: 16,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  header: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    marginBottom: 16,
    paddingLeft: 7,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    marginVertical: 8,
    paddingLeft: 7,
    color: "#9A9A9A",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: -7,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 11,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "DMSans_400Regular",
  },
  userName: {
    fontFamily: "DMSans_700Bold",
  },

  actionButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  followingButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
  },
  followingButtonText: {
    color: "#333",
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
  },
});
