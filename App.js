import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import CalendarDropDown from "./screens/CalendarDropDown";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreateTaskScreen from "./screens/CreateTaskScreen";
import MapNavigation from "./screens/MapNavigation";
import FriendsScreen from "./screens/InviteFriends";
import Dashboard from "./screens/DashboardScreen";
import PomodoroScreen from "./screens/PomodoroScreen";
import Notification from "./screens/Notification";
import SignIn from "./screens/SignIn";
import preambleIV from "./screens/preambleIV";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import ForgotPasswordRP from "./screens/ForgotPasswordRP";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const FloatingButton = ({ navigation, currentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  if (currentRoute === "Profile") {
    return null;
  }

  const toggleMenu = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const createTaskStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50],
        }),
      },
    ],
  };
  const postEventStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {isOpen && (
        <>
          <Animated.View style={[styles.secondaryButton, postEventStyle]}>
            <TouchableOpacity onPress={() => navigation.navigate("CalendarDD")}>
              <Icon name="navigation" size={20} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.secondaryButton, createTaskStyle]}>
            <TouchableOpacity onPress={() => navigation.navigate("CreateTask")}>
              <Icon name="edit" size={20} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
        </>
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={toggleMenu}>
        <Icon name={isOpen ? "x" : "plus"} size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="preambleIV">
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {({ navigation }) => {
            const currentRoute =
              navigation.getState().routes[navigation.getState().index].name;

            return (
              <>
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarIcon: ({ focused }) => {
                      let iconName;

                      switch (route.name) {
                        case "Home":
                          iconName = "home";
                          break;
                        case "Search":
                          iconName = "search";
                          break;
                        case "Dashboard":
                          iconName = "grid";
                          break;
                        case "Pomodoro":
                          iconName = "clock";
                          break;
                        case "Schedule":
                          iconName = "calendar";
                          break;
                        case "Profile":
                          iconName = "user";
                          break;
                        case "Map":
                          iconName = "map";
                          break;
                        default:
                          iconName = "circle";
                      }

                      return (
                        <View
                          style={[
                            styles.iconContainer,
                            focused && styles.activeIconContainer,
                          ]}
                        >
                          <Icon
                            name={iconName}
                            size={18}
                            color={focused ? "#12224F" : "#9D9D9D"}
                          />
                          <Text
                            style={[
                              styles.label,
                              {
                                color: focused ? "#12224F" : "#9D9D9D",
                                fontWeight: focused ? "bold" : "normal",
                              },
                            ]}
                          >
                            {route.name}
                          </Text>
                        </View>
                      );
                    },
                    tabBarLabel: () => null, // Hide default label
                  })}
                >
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name="Search" component={SearchScreen} />
                  <Tab.Screen name="Dashboard" component={Dashboard} />
                  <Tab.Screen name="Schedule" component={ScheduleScreen} />
                  <Tab.Screen name="Pomodoro" component={PomodoroScreen} />
                  <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ tabBarStyle: { display: "none" } }} // Hide tab bar on Profile screen
                  />
                </Tab.Navigator>

                {/* Floating Add Button */}
                <FloatingButton
                  navigation={navigation}
                  currentRoute={currentRoute}
                />
              </>
            );
          }}
        </Stack.Screen>
        <Stack.Screen
          name="CreateTask"
          component={CreateTaskScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="preambleIV"
          component={preambleIV}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordRP"
          component={ForgotPasswordRP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CalendarDD"
          component={CalendarDropDown}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true, // Show the header
            title: "", // Set the title to an empty string or null to hide it
            headerStyle: {
              backgroundColor: "#F9FAFB", // Set the background color of the header
              elevation: 0, // Remove shadow on Android
              shadowOpacity: 0, // Remove shadow on iOS
              shadowOffset: { width: 0, height: 0 }, // No shadow offset
              shadowRadius: 0, // No shadow radius
            },
            headerTintColor: "#000", // Set the color of the back button or other header items
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 70,
    shadowColor: "#0000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconContainer: {
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 10,
    marginTop: 8,
  },
  container: {
    position: "absolute",
    bottom: 100,
    right: 30,
    alignItems: "center",
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF6F61",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#FF6F61",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  secondaryButton: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: 24,
    backgroundColor: "#FF6F61",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
