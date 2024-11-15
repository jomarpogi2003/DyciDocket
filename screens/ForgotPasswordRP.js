import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import Icon from "react-native-vector-icons/Ionicons";
import {
  getAuth,
  confirmPasswordReset,
  checkActionCode,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default function ResetPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, oobCode: initialOobCode } = route.params || {}; // Retrieve email and oobCode if available
  const [oobCode, setOobCode] = useState(initialOobCode || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordI, setShowPasswordI] = useState(false);
  const [showPasswordII, setShowPasswordII] = useState(false);
  const [loading, setLoading] = useState(false);
  const [borderColor] = useState(new Animated.Value(1));
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (oobCode) {
      checkActionCode(auth, oobCode)
        .then(() => {
          console.log("Action code is valid. Ready to reset password.");
        })
        .catch((error) => {
          console.error("Error checking action code:", error);
          Alert.alert(
            "Error",
            "Invalid or expired reset code. Please request a new reset link."
          );
          navigation.navigate("ForgotPassword");
        });
    }
  }, [oobCode, navigation]);

  const handleFocus = () => {
    Animated.timing(borderColor, {
      toValue: 2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(borderColor, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleChangePassword = async () => {
    setLoading(true);

    try {
      if (newPassword.length < 8) {
        Alert.alert("Error", "Password must be at least 8 characters long");
        return;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match!");
        return;
      }

      // For authenticated users without an oobCode
      if (!oobCode && user) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

        // Reauthenticate user
        await reauthenticateWithCredential(user, credential);

        // Update to the new password
        await updatePassword(user, newPassword);
        Alert.alert("Success", "Password updated successfully!");
        navigation.navigate("Main"); // Navigate to other screen
      } else if (oobCode) {
        // If oobCode is provided, confirm password reset
        await confirmPasswordReset(auth, oobCode, newPassword);
        Alert.alert("Success", "Password reset successful!");
        navigation.navigate("SignIn");
      } else {
        Alert.alert("Error", "User not authenticated.");
      }
    } catch (error) {
      let errorMessage = "An error occurred while updating the password.";
      if (error.code === "auth/invalid-action-code") {
        errorMessage =
          "The reset link is invalid or expired. Please request a new one.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "The new password is too weak. Please choose a stronger password.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Current password is incorrect. Please try again.";
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="navy" />;
  }

  const navSI = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          Reset Password for {email || "your account"}
        </Text>
        <Text style={styles.description}>
          Please enter your{" "}
          {oobCode
            ? "new password below"
            : "current and new password below to change your password."}
        </Text>

        {/* If no oobCode and user is authenticated, show current password field for reauthentication */}
        {!oobCode && user && (
          <Animated.View
            style={[
              styles.inputContainer,
              {
                borderColor: borderColor.interpolate({
                  inputRange: [1, 2],
                  outputRange: ["#ddd", "#0D0140"],
                }),
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#888"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              onFocus={handleFocus}
              onBlur={handleBlur}
              secureTextEntry
            />
          </Animated.View>
        )}

        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: borderColor.interpolate({
                inputRange: [1, 2],
                outputRange: ["#ddd", "#0D0140"],
              }),
            },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#888"
            value={newPassword}
            onChangeText={setNewPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={!showPasswordI}
          />
          <TouchableOpacity
            onPress={() => setShowPasswordI(!showPasswordI)}
            style={styles.eyeIconI}
          >
            <Icon
              name={showPasswordI ? "eye-off" : "eye"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: borderColor.interpolate({
                inputRange: [1, 2],
                outputRange: ["#ddd", "#0D0140"],
              }),
            },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={!showPasswordII}
          />
          <TouchableOpacity
            onPress={() => setShowPasswordII(!showPasswordII)}
            style={styles.eyeIconII}
          >
            <Icon
              name={showPasswordII ? "eye-off" : "eye"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.resetButtonText}>Change Password</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={navSI}>
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
    fontSize: 30,
    color: "#0D0140",
    textAlign: "center",
    marginBottom: 11,
  },
  description: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: "#524B6B",
    textAlign: "center",
    marginBottom: 50,
    padding: 5,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  input: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    height: "100%",
    color: "#000",
  },
  eyeIconI: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  eyeIconII: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  resetButton: {
    backgroundColor: "#0D0140",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
    marginTop: 25,
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
});
