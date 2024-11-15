import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Svg, { G, Path, Text as SvgText, Circle, Rect } from "react-native-svg";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const calculateCoordinates = (radius, angle) => {
  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);
  return { x, y };
};

// PieSlice component to render each slice with a label
const PieSlice = ({ value, total, color, radius, startAngle }) => {
  const angle = (value / total) * 360;
  const centerOffset = 175; // Adjust this based on SVG size for center alignment
  const { x: startX, y: startY } = calculateCoordinates(radius, startAngle);
  const { x: endX, y: endY } = calculateCoordinates(radius, startAngle + angle);

  const largeArcFlag = angle > 180 ? 1 : 0;
  const d = `M ${centerOffset} ${centerOffset} L ${startX + centerOffset} ${
    startY + centerOffset
  } A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX + centerOffset} ${
    endY + centerOffset
  } Z`;

  const textDistance = radius * 0.99;
  const textAngle = startAngle + angle / 2;
  const { x: textX, y: textY } = calculateCoordinates(textDistance, textAngle);

  // Padding and background styling
  const paddingX = -4;
  const paddingY = 11;
  const backgroundColor = "#12224F";
  const textWidth = 50; // Adjust based on font size and text length
  const textHeight = 20; // Adjust based on font size and desired padding

  return (
    <G>
      <Path d={d} fill={color} />
      {/* Background rectangle for padding */}
      <Rect
        x={textX + centerOffset - textWidth / 2 - paddingX / 2}
        y={textY + centerOffset - textHeight / 2 - paddingY / 2}
        width={textWidth + paddingX}
        height={textHeight + paddingY}
        fill={backgroundColor}
        rx={11} // Rounded corners (optional)
      />
      {/* Text with background */}
      <SvgText
        fill="white"
        fontSize="14"
        x={textX + centerOffset}
        y={textY + centerOffset}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {`${((value / total) * 100).toFixed(0)}%`}
      </SvgText>
    </G>
  );
};

const DashboardScreen = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  const [selectedMonth, setSelectedMonth] = useState("Jan.");
  const [open, setOpen] = useState(false);
  const [items] = useState([
    { label: "Jan", value: "Jan." },
    { label: "Feb", value: "Feb." },
    { label: "Mar", value: "Mar." },
    { label: "Apr", value: "Apr." },
    { label: "May", value: "May." },
    { label: "Jun", value: "Jun." },
    { label: "Jul", value: "Jul." },
    { label: "Aug", value: "Aug." },
    { label: "Sep", value: "Sep." },
    { label: "Oct", value: "Oct." },
    { label: "Nov", value: "Nov." },
    { label: "Dec", value: "Dec." },
  ]);

  const [timePeriod, setTimePeriod] = useState("Month");

  const handleIconPress = (icon) => {
    console.log(`Pressed icon: ${icon}`);
  };

  const series = [20, 10, 30, 10, 40];
  const sliceColor = ["#00c880", "#aca1f1", "#273270", "#ffa800", "#3478f7"];
  const total = series.reduce((acc, val) => acc + val, 0);
  const radius = 143;

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="navy" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./assets/ddp.jpg")}
          style={styles.profilePicture}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleIconPress("icon1")}>
            <Image
              source={require("./assets/settings.jpg")}
              style={styles.iconButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleIconPress("icon2")}>
            <Image
              source={require("./assets/messages.jpg")}
              style={styles.iconButton}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>👋 Welcome in, User</Text>
        <Text style={styles.dashboardText}>Your Dashboard</Text>
        <TouchableOpacity style={styles.taskButton}>
          <Text style={styles.taskButtonText}>3 Team/s task request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pieChartContainer}>
        <Svg height="350" width="350">
          {series.map((value, index) => (
            <PieSlice
              key={index}
              value={value}
              total={total}
              color={sliceColor[index]}
              radius={radius}
              startAngle={series
                .slice(0, index)
                .reduce((acc, val) => acc + (val / total) * 360, 0)}
            />
          ))}
          <Circle cx="175" cy="175" r="80" fill="white" />
        </Svg>
        <View style={styles.chartTextContainer}>
          <Text style={styles.chartText}>Task this</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMonth}
              style={{ height: 60, width: 120 }}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
              {items.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.chartTitle}>69 Task</Text>
        </View>

        <View style={styles.timePeriodContainer}>
          {["Week", "Month", "Year"].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timePeriodButton,
                timePeriod === period && styles.selectedTimePeriod,
              ]}
              onPress={() => setTimePeriod(period)}
            >
              <Text
                style={[
                  styles.timePeriodText,
                  timePeriod === period
                    ? { color: "black", fontWeight: "bold" } // Selected style
                    : { color: "#bababa" }, // Unselected style
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.taskCategoriesContainer}>
        <Text style={styles.taskCategoriesTitle}>Task Categories</Text>
        <View style={styles.taskGrid}>
          <View style={styles.taskBox}>
            <Text style={styles.taskCount}>4 Task</Text>
            <Text style={styles.taskName}>Group</Text>
            <Text style={styles.taskPercentage}>40%</Text>
            <Image
              source={require("./assets/GROUP logo.png")}
              style={styles.taskImage}
            />
          </View>
          <View style={styles.taskBox}>
            <Text style={styles.taskCount}>3 Task</Text>
            <Text style={styles.taskName}>Meeting</Text>
            <Text style={styles.taskPercentage}>30%</Text>
            <Image
              source={require("./assets/MEETING logo.png")}
              style={styles.taskImage}
            />
          </View>
          <View style={styles.taskBox}>
            <Text style={styles.taskCount}>2 Task</Text>
            <Text style={styles.taskName}>Personal</Text>
            <Text style={styles.taskPercentage}>20%</Text>
            <Image
              source={require("./assets/PERSONAL logo.png")}
              style={styles.taskImage}
            />
          </View>
          <View style={styles.taskBox}>
            <Text style={styles.taskCount}>1 Task</Text>
            <Text style={styles.taskName}>Event</Text>
            <Text style={styles.taskPercentage}>10%</Text>
            <Image
              source={require("./assets/EVENT logo.png")}
              style={styles.taskImage}
            />
          </View>
          <View style={styles.taskBox}>
            <Text style={styles.taskCount}>1 Task</Text>
            <Text style={styles.taskName}>Work</Text>
            <Text style={styles.taskPercentage}>10%</Text>
            <Image
              source={require("./assets/WORK logo.png")}
              style={styles.taskImage}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 70,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 55,
    marginRight: 4,
  },
  welcomeContainer: {
    alignItems: "flex-start",
    marginBottom: 25,
    paddingLeft: 20,
  },
  welcomeText: {
    fontSize: 17,
    color: "#333",
    fontFamily: "DMSans_400Regular",
  },
  dashboardText: {
    fontSize: 28,
    color: "#333",
    marginTop: 5,
    fontFamily: "DMSans_700Bold",
  },
  taskButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff7092",
    height: 34,
    width: 220,
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
  taskButtonText: {
    color: "#ff7092",
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    marginTop: -2,
  },
  pieChartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    backgroundColor: "white",
  },
  chartTextContainer: {
    position: "absolute",
    alignItems: "center",
    paddingBottom: 56,
  },
  chartText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "DMSans_400Regular",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  chartTitle: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#333",
  },
  timePeriodContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 10,
    paddingVertical: 4,
    marginTop: -14,
  },
  timePeriodButton: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  timePeriodText: {
    fontSize: 16,
    color: "#bababa",
    fontFamily: "DMSans_700Bold",
  },
  taskCategoriesContainer: {
    paddingHorizontal: 20,
    marginTop: -7,
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  taskCategoriesTitle: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#333",
  },
  taskGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 5, // Increase left and right padding
  },

  taskBox: {
    width: "47%",
    height: "30%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white", // Set background color to white
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Adjusted for a shadow at the bottom
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // Elevation for Android shadow
  },
  taskCount: {
    fontSize: 17,
    fontFamily: "DMSans_700Bold",
    color: "#333",
  },
  taskName: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#888",
    marginTop: -1,
  },
  taskPercentage: {
    position: "absolute", // Set position to absolute
    top: 10, // Adjust as needed
    right: 10, // Adjust as needed
    fontSize: 18,
    color: "#333",
    fontFamily: "DMSans_700Bold",
    marginTop: 4,
  },
  taskImage: {
    width: 50,
    height: 50,
    left: "-5%",
    top: "15%",
  },
});

export default DashboardScreen;
