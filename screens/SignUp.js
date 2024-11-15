import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { auth, db } from "../Firebase"; //Connection to firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export default function App() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentID, setStudentID] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailBorderColor] = useState(new Animated.Value(1));
  const [passwordBorderColor] = useState(new Animated.Value(1));
  const [studentIDBorderColor] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [studentIDError, setStudentIDError] = useState(false);
  const [emailShakeAnimation] = useState(new Animated.Value(0));
  const [passwordShakeAnimation] = useState(new Animated.Value(0));
  const [studentIDShakeAnimation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "722097389151-er8ugqvbkum6i6epr8vgad7vv70p5m4i.apps.googleusercontent.com722097389151-er8ugqvbkum6i6epr8vgad7vv70p5m4i.apps.googleusercontent.com", // Replace with your Web client ID from Firebase Console
    });
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="navy" />;
  }

  const handleFocus = (borderColor) => {
    Animated.timing(borderColor, {
      toValue: 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (borderColor) => {
    Animated.timing(borderColor, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const startShake = (animation) => {
    animation.setValue(0);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: -3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const navSI = () => {
    navigation.navigate("SignIn");
  };

  const handleSignUp = () => {
    // Reset error states
    setEmailError(false);
    setPasswordError(false);
    setStudentIDError(false);
    setEmailExistsError(false);

    // Validate the inputs
    let isValid = true;
    if (studentID === "") {
      setStudentIDError(true);
      startShake(studentIDShakeAnimation);
      isValid = false;
    }
    if (email === "") {
      setEmailError(true);
      startShake(emailShakeAnimation);
      isValid = false;
    }
    if (password === "") {
      setPasswordError(true);
      startShake(passwordShakeAnimation);
      isValid = false;
    } else if (password.length < 8) {
      // Check if the password is less than 8 characters
      setPasswordError(true);
      startShake(passwordShakeAnimation);
      alert("Password must be at least 8 characters long"); // Show error message
      isValid = false;
    }

    if (isValid) {
      setLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered user: ", user.email);

          return setDoc(doc(db, "users", user.uid), {
            email: user.email,
            studentID: studentID, // Ensure this is included
            following: [],
            followers: [],
            friends: [],
            friendRequests: [],
            groups: [],
          });
        })
        .then(() => {
          setLoading(false);
          navSI();
        })
        .catch((error) => {
          setLoading(false);
          if (error.code === "auth/email-already-in-use") {
            setEmailExistsError(true);
            startShake(emailShakeAnimation);
          } else {
            alert(error.message);
          }
        });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Step 1: Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();

      // Step 2: Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Step 3: Sign in with the Google credential
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );

      // Optional: Add any additional logic here after successful sign-in
      console.log("Google Sign-In user: ", userCredential.user.email);

      // Navigate or handle successful sign-in as needed
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image
            source={require("./assets/DDT logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.description}>
            Please ensure all fields are completed before proceeding with your
            registration.
          </Text>

          {/* Student ID Input */}
          <Text style={styles.inputLabel}>Student ID:</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              {
                borderColor: studentIDError
                  ? "red"
                  : studentIDBorderColor.interpolate({
                      inputRange: [1, 2],
                      outputRange: ["#ddd", "#0D0140"],
                    }),
                transform: [{ translateX: studentIDShakeAnimation }],
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your Student ID"
              placeholderTextColor="#888"
              value={studentID}
              onChangeText={setStudentID}
              onFocus={() => handleFocus(studentIDBorderColor)}
              onBlur={() => handleBlur(studentIDBorderColor)}
              keyboardType="numeric"
            />
          </Animated.View>
          {studentIDError && (
            <Text style={styles.errorText}>Invalid Student ID</Text>
          )}

          {/* Email Input */}
          <Text style={styles.inputLabel}>Email:</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              {
                borderColor: emailError
                  ? "red"
                  : emailBorderColor.interpolate({
                      inputRange: [1, 2],
                      outputRange: ["#ddd", "#0D0140"],
                    }),
                transform: [{ translateX: emailShakeAnimation }],
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleFocus(emailBorderColor)}
              onBlur={() => handleBlur(emailBorderColor)}
              keyboardType="email-address"
            />
          </Animated.View>
          {emailError && !emailExistsError && (
            <Text style={styles.errorText}>Invalid Email</Text>
          )}
          {emailExistsError && (
            <Text style={styles.errorText}>Email already exists</Text>
          )}

          {/* Password Input */}
          <Text style={styles.inputLabel}>Password:</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              {
                borderColor: passwordError
                  ? "red"
                  : passwordBorderColor.interpolate({
                      inputRange: [1, 2],
                      outputRange: ["#ddd", "#0D0140"],
                    }),
                transform: [{ translateX: passwordShakeAnimation }],
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => handleFocus(passwordBorderColor)}
              onBlur={() => handleBlur(passwordBorderColor)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </Animated.View>
          {passwordError && (
            <Text style={styles.errorText}>Invalid Password</Text>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>SIGN UP</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleGoogleSignIn}
          >
            <Text style={styles.loginButtonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            You already have a DYCIdocket account?{" "}
            <Text onPress={navSI} style={styles.signUpLink}>
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 20,
    marginTop: -7,
  },
  title: {
    fontFamily: "DMSans_700Bold",
    color: "#0D0140",
    fontSize: 30,
    marginBottom: 11,
  },
  description: {
    fontFamily: "DMSans_400Regular",
    color: "#524B6B",
    textAlign: "center",
    marginBottom: 50,
  },
  inputLabel: {
    fontFamily: "DMSans_700Bold", // Same font style for consistency
    color: "#0D0140", // Dark color for the label
    fontSize: 16, // Adjust size as needed
    marginBottom: 8, // Space between label and input
    alignSelf: "flex-start", // Align the text label to the start (left)
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 25,
    position: "relative",
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  loginButton: {
    backgroundColor: "#0D0140",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 70,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
  },
  signUpContainer: {
    position: "absolute",
    bottom: 47, // Adjust this value as needed for vertical positioning
    left: 0,
    right: 0,
    alignItems: "center",
  },
  signUpText: {
    fontFamily: "DMSans_400Regular",
    color: "#524B6B",
    fontSize: 12,
  },
  signUpLink: {
    fontFamily: "DMSans_700Bold",
    color: "#0D0140",
    textDecorationLine: "underline",
  },
  errorText: {
    fontFamily: "DMSans_400Regular",
    color: "red",
    fontSize: 12,
    marginBottom: 15,
    alignSelf: "flex-start",
    marginTop: -22,
    paddingLeft: 10,
  },
});
