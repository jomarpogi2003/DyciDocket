import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
  View,
} from "react-native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function Preamble({ navigation }) {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  const slideAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const moveLeftAnim = useRef(new Animated.Value(0)).current;
  const circleAnim = useRef(new Animated.Value(0)).current; // For the circle animation

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      const animationSequence = Animated.sequence([
        // Existing animations
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(moveLeftAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.parallel([
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 200,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
              toValue: 1,
              duration: 600,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
        ]),
        // Delay before circle animation
        Animated.delay(1000),
        // Circle bounce and expansion animation
        Animated.sequence([
          Animated.timing(circleAnim, {
            toValue: 1,
            duration: 300, // Bounce duration
            easing: Easing.bounce,
            useNativeDriver: true,
          }),
          Animated.timing(circleAnim, {
            toValue: 2, // Expand to cover the screen
            duration: 1000, // Slowed expansion duration for a smoother effect
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]);

      animationSequence.start();

      const navigateTimer = setTimeout(() => {
        navigation.replace("SignIn");
      }, 3300); // Adjusted for new timings

      return () => {
        clearTimeout(navigateTimer);
      };
    }, 1000);

    return () => {
      clearTimeout(animationTimer);
    };
  }, [
    slideAnim,
    opacityAnim,
    rotateAnim,
    moveLeftAnim,
    circleAnim,
    navigation,
  ]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="white" />;
  }

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "0deg"],
  });

  const opacityInterpolate = slideAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const moveLeftInterpolate = moveLeftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const circleScaleInterpolate = circleAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 4.5], // Adjust to cover the screen
  });

  // Keep circle at full opacity during the bounce and expand
  const circleOpacityInterpolate = circleAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1, 1], // Always 100% opacity
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./assets/DD logo.png")}
        style={[
          styles.logo,
          {
            marginLeft: 45,
            transform: [
              { rotate: rotateInterpolate },
              { translateX: moveLeftInterpolate },
            ],
            zIndex: 1,
          },
        ]}
      />
      <Animated.Image
        source={require("./assets/TEXT logo.png")}
        style={[
          styles.logoo,
          {
            opacity: opacityInterpolate,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-60, 7],
                }),
              },
            ],
            marginLeft: -65,
            zIndex: 0,
          },
        ]}
      />
      {/* Bouncing and expanding circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: circleScaleInterpolate }],
            opacity: circleOpacityInterpolate,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    width: 70,
    height: 70,
  },
  logoo: {
    width: 111,
    height: 111,
    marginTop: 11,
  },
  circle: {
    position: "absolute",
    width: 200, // Starting width of the circle
    height: 200, // Starting height of the circle
    borderRadius: 100, // Make it circular
    backgroundColor: "#0D0140", // Change color as needed
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    marginLeft: -100, // Half of the circle's width
    marginTop: -100, // Half of the circle's height
    zIndex: 1,
  },
});
