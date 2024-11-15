// ForgotPassword.js

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import { auth, db } from "../Firebase"; // Make sure to export `db` from Firebase.js
import {
  getAuth,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailBorderColor] = useState(new Animated.Value(1));
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  const handleFocus = () => {
    Animated.timing(emailBorderColor, {
      toValue: 2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(emailBorderColor, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleVerifyEmail = async () => {
    if (!email) {
      setErrorMessage("Please enter an email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Check if the email exists in Firebase Authentication
      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        email.trim().toLowerCase()
      );

      if (signInMethods.includes("password")) {
        // Sign in the user to ensure we have access to sendEmailVerification
        const password = prompt("Please enter your password"); // Optional: Collect password securely
        const { user } = await signInWithEmailAndPassword(
          auth,
          email.trim().toLowerCase(),
          password
        );

        // Check if the user’s email is already verified
        if (user.emailVerified) {
          setSuccessMessage(
            "Email is verified! Redirecting to reset password."
          );
          navigation.navigate("ForgotPasswordRP", { email });
        } else {
          // Send verification email
          await sendEmailVerification(user);
          setSuccessMessage(
            "Verification email has been sent. Please check your inbox."
          );
        }
      } else {
        // If email does not exist in Auth, check Firestore
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", email.trim().toLowerCase())
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          setSuccessMessage(
            "Email found in Firestore! Redirecting to reset password."
          );
          navigation.navigate("ForgotPasswordRP", { email });
        } else {
          setErrorMessage("Email doesn't exist.");
        }
      }
    } catch (error) {
      console.error(
        "Error during email verification:",
        error.message,
        error.code
      );
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="navy" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.description}>
          To reset your password, enter your registered email.
        </Text>

        <View style={styles.logoContainer}>
          <Image source={require("./assets/FP logo.png")} style={styles.logo} />
        </View>

        <Text style={styles.inputLabel}>Email:</Text>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: emailBorderColor.interpolate({
                inputRange: [1, 2],
                outputRange: ["#ddd", "#0D0140"],
              }),
            },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType="email-address"
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {successMessage ? (
            <Text style={{ color: "green" }}>{successMessage}</Text>
          ) : null}
        </Animated.View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleVerifyEmail}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.resetButtonText}>VERIFY EMAIL</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>BACK TO LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 29,
    color: "#0D0140",
    textAlign: "center",
    marginBottom: 11,
  },
  description: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: "#524B6B",
    textAlign: "center",
    marginBottom: 40,
    padding: 5,
  },
  inputLabel: {
    fontFamily: "DMSans_700Bold",
    color: "#0D0140",
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  input: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    height: "100%",
    color: "#000",
  },
  resetButton: {
    backgroundColor: "#0D0140",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  resetButtonText: {
    color: "#fff",
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
  },
  backButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    marginBottom: 11,
  },
  backButtonText: {
    color: "#0D0140",
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});
