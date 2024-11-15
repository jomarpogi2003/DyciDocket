import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Initial list of events
const todaysEvents = [
  {
    id: 1,
    creditname: "John Rick Salazar",
    title: "Basketball Tryouts",
    type: "Sports",
    date: "Sept 11, 2024",
    timefrom: "4:00pm",
    timeto: "7:00pm",
    timeago: "1 hr ago", //create function that compute the time ago based on "timefrom"
    view: "5.6m",
    image:
      "https://s3-us-west-2.amazonaws.com/sportshub2-uploads-prod/files/sites/960/2021/04/28065933/gettyimages-1139190122-640x640.jpg",
    profile:
      "https://scontent.fcrk2-4.fna.fbcdn.net/v/t39.30808-6/461750511_3819105345029374_405229036448236417_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGZ_LeL3_WaLuIFcb2jiJOtd5yPt4lo1ER3nI-3iWjURLUMusN41NYYIzQtDI8Ge0z9vG3tPpx9ZUFJAsq4xude&_nc_ohc=45XZIb-tyQAQ7kNvgEWRNd0&_nc_zt=23&_nc_ht=scontent.fcrk2-4.fna&_nc_gid=AoIDaih_xYU8YuJfgkjHZ4S&oh=00_AYAjRjKCnMdNyUJkN5UHx70sBNgIjWdkdgCy_g1KJKe6jA&oe=67385E09",
    description:
      "Coaches evaluate players based on their technical skills, athleticism, teamwork, attitude, and potential for growth. Tryouts often involve both individual assessments and group activities, allowing coaches to see how athletes perform in different game situations. A successful tryout often leads to an invitation to join the team or further training opportunities.",
    link: "BBall Tryout Registration:",
  },

  {
    id: 2,
    creditname: "Vhanery Joy Bacal",
    title: "Quiz Bee Competition",
    type: "College",
    date: "Sept 11, 2024",
    timefrom: "2:00pm",
    timeto: "5:00pm",
    timeago: "2 hrs ago",
    view: "2.6m",
    image:
      "https://statesboroherald.cdn-anvilcms.net/media/images/2018/08/24/images/Bee_Smart.max-640x480.jpg",
    profile:
      "https://scontent.fcrk2-4.fna.fbcdn.net/v/t1.15752-9/462576711_910596394357162_4176579423173847499_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEavep5hhM4ZM2HgJP0J9ZhJX3gcKaoh50lfeBwpqiHnfi_6Ol5_S4s-Wx-O8BjJ4IWW6riHhzSMWgopRGFOCNQ&_nc_ohc=0JMV6VwWPrIQ7kNvgGbN80g&_nc_zt=23&_nc_ht=scontent.fcrk2-4.fna&oh=03_Q7cD1QH6wGI3XxJObZop-lnXp4ffRCRfqoeCqziMndajbtlc8w&oe=6759F770",
    description:
      "Join us for the upcoming tryouts where you’ll have the chance to demonstrate your unique abilities and qualities.",
    link: "QBZ Registration:",
  },
  {
    id: 3,
    creditname: "Samantha Amponin",
    title: "Mangrove Art Contest",
    type: "Art",
    date: "Sept 11, 2024",
    timefrom: "9:00am",
    timeto: "11:00am",
    timeago: "3 hrs ago",
    view: "2.5m",
    image:
      "https://www.expatmedia.net/wp-content/uploads/2024/09/student-artists.jpg",
    profile:
      "https://scontent.fcrk2-3.fna.fbcdn.net/v/t39.30808-1/462189891_8322424377876127_1879278097442179862_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHveFkddGL6DeuoawdNNiAFH868_VR_1H0fzrz9VH_UfT3D4dQiC0cZ6hbrGUS50sq3eEaBj5k82OeapGw48V_2&_nc_ohc=nAuscqsyXzYQ7kNvgHFZndj&_nc_zt=24&_nc_ht=scontent.fcrk2-3.fna&_nc_gid=AWzcVhU0A5Pa2XMY9y7qXHp&oh=00_AYBdaNWxsR9sqSGmjKXtAczYVCyRE8dBihCwFLEbzn5Cuw&oe=673851AE",
    description:
      "Join us for the upcoming tryouts where you’ll have the chance to demonstrate your unique abilities and qualities.",
    link: "MAC Registration",
  },
];

const eventListItems = [
  {
    id: 1,
    category: "College",
    creditname: "Vhanery Joy Bacal",
    title: "Quiz Bee Competition",
    type: "College",
    date: "Sept 11, 2024",
    timefrom: "2:00pm",
    timeto: "5:00pm",
    timeago: "2 hrs ago",
    view: "2.6m",
    image:
      "https://statesboroherald.cdn-anvilcms.net/media/images/2018/08/24/images/Bee_Smart.max-640x480.jpg",
    profile:
      "https://scontent.fcrk2-4.fna.fbcdn.net/v/t1.15752-9/462576711_910596394357162_4176579423173847499_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEavep5hhM4ZM2HgJP0J9ZhJX3gcKaoh50lfeBwpqiHnfi_6Ol5_S4s-Wx-O8BjJ4IWW6riHhzSMWgopRGFOCNQ&_nc_ohc=0JMV6VwWPrIQ7kNvgGbN80g&_nc_zt=23&_nc_ht=scontent.fcrk2-4.fna&oh=03_Q7cD1QH6wGI3XxJObZop-lnXp4ffRCRfqoeCqziMndajbtlc8w&oe=6759F770",
    description:
      "Join us for the upcoming tryouts where you’ll have the chance to demonstrate your unique abilities and qualities.",
    link: "QBZ Registration:",
  },
  {
    id: 2,
    category: "Art",
    creditname: "Samantha Amponin",
    title: "Mangrove Art Contest",
    type: "Art",
    date: "Sept 11, 2024",
    timefrom: "9:00am",
    timeto: "11:00am",
    timeago: "3 hrs ago",
    view: "2.5m",
    image:
      "https://www.expatmedia.net/wp-content/uploads/2024/09/student-artists.jpg",
    profile:
      "https://scontent.fcrk2-3.fna.fbcdn.net/v/t39.30808-1/462189891_8322424377876127_1879278097442179862_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHveFkddGL6DeuoawdNNiAFH868_VR_1H0fzrz9VH_UfT3D4dQiC0cZ6hbrGUS50sq3eEaBj5k82OeapGw48V_2&_nc_ohc=nAuscqsyXzYQ7kNvgHFZndj&_nc_zt=24&_nc_ht=scontent.fcrk2-3.fna&_nc_gid=AWzcVhU0A5Pa2XMY9y7qXHp&oh=00_AYBdaNWxsR9sqSGmjKXtAczYVCyRE8dBihCwFLEbzn5Cuw&oe=673851AE",
    description:
      "Join us for the upcoming tryouts where you’ll have the chance to demonstrate your unique abilities and qualities.",
    link: "MAC Registration",
  },
];

const EventApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();

  // Load fonts
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  // If fonts are not loaded, show a loading indicator
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  // Filter events based on the selected category for Category Events
  const filteredEventList =
    selectedCategory === "All"
      ? eventListItems
      : eventListItems.filter((item) => item.category === selectedCategory);

  const handleEventPress = (event) => {
    navigation.navigate("HomePageTD", { event }); // Passing the selected event to the EventDetails screen
  };

  const navNotification = () => {
    navigation.navigate("Notification");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Background Layers */}
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />

      {/* Content */}
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={require("./assets/DDT logo.png")} // Adjust this path based on where the image is stored
            style={styles.logoImage}
          />
          <Icon
            name="notifications-outline"
            size={24}
            color="#fff"
            onPress={navNotification}
          />
        </View>

        <Text style={styles.welcome}>Welcome in, User 👋</Text>
        <Text style={styles.feed}>News Feed</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Today's Event - No category filter, display all events */}
        <Text style={styles.sectionTitle}>Today's Event</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {/* Event Cards - All events, no filtering */}
          {todaysEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => handleEventPress(event)}
            >
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <Text
                style={styles.eventTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {event.title}
              </Text>
              <Text style={styles.eventType}>{event.type}</Text>
              <View style={styles.footerCard}>
                <Image source={require("./assets/Clock.png")} />
                <Text style={styles.eventTimeAgo}>{event.timeago}</Text>
                <Image source={require("./assets/Eye.png")} />
                <Text style={styles.eventView}>{event.view}</Text>
                <Image
                  source={{ uri: event.profile }}
                  style={styles.eventImageProfile}
                />
              </View>
            </TouchableOpacity>
          ))}
          <Text style={styles.blankSection}>Aa</Text>
        </ScrollView>

        {/* Category Events */}
        <Text style={styles.sectionTitle2}>Category Events</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {[
            "All",
            "Sports",
            "Art",
            "Music",
            "College",
            "Tech",
            "Workshop",
            "Community",
          ].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive, // Apply active style if selected
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.blankSection}>Aa</Text>
        </ScrollView>

        {/* Event List - Filtered by category */}
        <View style={styles.eventList}>
          {filteredEventList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.eventListItem}
              onPress={() => handleEventPress(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.eventListImage}
              />
              <View>
                <Text
                  style={styles.eventListTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
                <Text style={styles.eventListType}>{item.type}</Text>
                <View style={styles.footerListCard}>
                  <Image source={require("./assets/Clock.png")} />
                  <Text style={styles.eventListDate}>{item.date}</Text>
                  <Image
                    source={{ uri: item.profile }}
                    style={styles.eventListImageProfile}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBackground: {
    position: "absolute",
    top: 0,
    width: width,
    height: 350,
    backgroundColor: "#12224F",
  },
  bottomBackground: {
    position: "absolute",
    top: 350,
    width: width,
    bottom: 0,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 7,
  },
  logoImage: { width: 100, height: 60, resizeMode: "contain" },
  welcome: {
    fontSize: 16,
    color: "#ccc",
    fontFamily: "DMSans_400Regular",
    paddingLeft: 27,
  },
  feed: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "DMSans_700Bold",
    paddingTop: 4,
    paddingLeft: 27,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(209, 208, 208, 0.4)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginVertical: 12,
    marginHorizontal: 25,
    fontFamily: "DMSans_400Regular",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    paddingLeft: 8,
    fontFamily: "DMSans_400Regular",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 8,
    fontFamily: "DMSans_700Bold",
    paddingLeft: 25,
    paddingBottom: 7,
  },
  sectionTitle2: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginVertical: 8,
    fontFamily: "DMSans_700Bold",
    paddingLeft: 25,
    paddingBottom: 7,
    marginTop: -4,
  },
  scrollView: { marginBottom: 16, paddingLeft: 25 },
  eventCard: {
    width: 227,
    height: 254,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 8,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 11,
  },
  eventImage: { width: 197, height: 112, borderRadius: 16, margin: 7 },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
    color: "#000",
    fontFamily: "DMSans_700Bold",
    textAlign: "left", // Added left alignment
    paddingLeft: 10,
  },
  eventListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
    color: "#000",
    fontFamily: "DMSans_700Bold",
    textAlign: "left", // Added left alignment
    maxWidth: 173,
    paddingLeft: 7,
  },

  categoryContainer: {
    flexDirection: "row",
    marginVertical: 8,
    paddingLeft: 20,
  },
  categoryButton: {
    backgroundColor: "#8c8cae", // Default gray color for unselected categories
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginHorizontal: 4,
  },
  categoryButtonActive: {
    backgroundColor: "#2e2e4e", // Darker color for selected category
  },
  blankSection: {
    paddingLeft: 11,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  eventList: { marginTop: 16, marginHorizontal: 25 },
  eventListItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 11,
    height: 126,
  },
  eventType: {
    backgroundColor: "#2e2e4e", // Default gray color for unselected categories
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 4,
    alignSelf: "flex-start", // Aligns the box to the left based on content width
    color: "#fff",
    fontFamily: "DMSans_400Regular",
  },
  eventListType: {
    backgroundColor: "#2e2e4e", // Default gray color for unselected categories
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 4,
    alignSelf: "flex-start", // Aligns the box to the left based on content width
    color: "#fff",
    fontFamily: "DMSans_400Regular",
    marginTop: 5,
  },
  eventListImage: { width: 120, height: 105, borderRadius: 8, marginRight: 8 },
  eventDate: { fontSize: 12, color: "#666", fontFamily: "DMSans_400Regular" },
  eventListDate: {
    fontSize: 12,
    color: "#666",
    fontFamily: "DMSans_400Regular",
    paddingLeft: 7,
  },
  footerCard: {
    flexDirection: "row", // Align children in a row
    alignItems: "center", // Vertically center all items
    justifyContent: "space-between", // Space out the items evenly
    marginTop: 10,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  footerListCard: {
    flexDirection: "row", // Align children in a row
    alignItems: "center", // Vertically center all items
    justifyContent: "space-between", // Space out the items evenly
    marginTop: 10,
    paddingHorizontal: 5,
    paddingTop: 11,
  },
  eventTimeAgo: {
    fontSize: 14,
    color: "#B6B6B6",
    fontFamily: "DMSans_400Regular",
    marginRight: 10, // Space between time and view
  },
  eventView: {
    fontSize: 14,
    color: "#B6B6B6",
    fontFamily: "DMSans_400Regular",
    marginRight: 10, // Space between view and profile picture
  },
  eventImageProfile: {
    width: 30,
    height: 30,
    borderRadius: 15, // Round the profile image
    marginLeft: 10, // Space between the image and text
  },
  eventListImageProfile: {
    width: 25,
    height: 25,
    borderRadius: 15, // Round the profile image
    marginLeft: 30, // Space between the image and text
  },
});

export default EventApp;
