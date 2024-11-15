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
import { auth } from "../Firebase"; //Connection on Firebase file
import { signInWithEmailAndPassword } from "firebase/auth"; // Import this function correctly

// Google Authentication
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function App() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailBorderColor] = useState(new Animated.Value(1));
  const [passwordBorderColor] = useState(new Animated.Value(1));
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [emailError, setEmailError] = useState(false); // Email error state
  const [passwordError, setPasswordError] = useState(false); // Password error state

  // Animated values for shake animation
  const [emailShakeAnimation] = useState(new Animated.Value(0));
  const [passwordShakeAnimation] = useState(new Animated.Value(0));

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

  const navFP = () => {
    navigation.navigate("ForgotPassword");
  };

  const navSU = () => {
    navigation.navigate("SignUp");
  };

  const navA = () => {
    // Navigation logic after successful login
    navigation.navigate("Main"); // TEST NAVIGATION ONLY <no HOMEPAGE YET>
  };

  const handleLogin = () => {
    /// LOGIN FUNCTION
    // Reset error states
    setEmailError(false);
    setPasswordError(false);

    // Validate the inputs
    let isValid = true;
    if (email === "") {
      setEmailError(true); // Set email error if empty
      startShake(emailShakeAnimation); // Start shake animation
      isValid = false;
    }
    if (password === "") {
      setPasswordError(true); // Set password error if empty
      startShake(passwordShakeAnimation); // Start shake animation
      isValid = false;
    }

    if (isValid) {
      setLoadingLogin(true); // Start loading

      // Attempt to sign in with Firebase
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          setLoadingLogin(false); // Stop loading
          const user = userCredentials.user;
          console.log("Logged in user: ", user.email);
          navA(); // Navigate to the next screen after successful login
        })
        .catch((error) => {
          setLoadingLogin(false); // Stop loading on error

          // Check if the error is due to invalid credentials and trigger shake
          if (
            error.code === "auth/user-not-found" ||
            error.code === "auth/invalid-credential"
          ) {
            // Shake both email and password fields to indicate incorrect credentials
            startShake(emailShakeAnimation);
            setEmailError(true);
            startShake(passwordShakeAnimation);
            setPasswordError(true);
          } else if (error.code === "auth/wrong-password") {
            startShake(passwordShakeAnimation);
            setPasswordError(true);
          } else if (error.code === "auth/invalid-email") {
            startShake(emailShakeAnimation);
            setEmailError(true);
          }

          alert(error.message); // Show error message
        });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true); // Start loading

      // Configure Google Sign-In
      GoogleSignin.configure({
        webClientId:
          "722097389151-er8ugqvbkum6i6epr8vgad7vv70p5m4i.apps.googleusercontent.com", // Replace with your Firebase project's web client ID
      });

      // Sign in with Google and get the user's ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );

      // Successful sign-in
      console.log("Logged in with Google:", userCredential.user.email);
      navA(); // Navigate to the main screen after successful login
    } catch (error) {
      console.error(error);
      alert("Google Sign-In failed. Please try again.");
    } finally {
      setLoadingGoogle(false); // Stop loading
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
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.description}>
            Dock Your Events, Sail Through Your Day.
          </Text>

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
          {emailError && <Text style={styles.errorText}>Invalid Email</Text>}

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

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={styles.checkbox}>
                {rememberMe && (
                  <Icon name="checkmark" size={18} color="#0D0140" />
                )}
              </View>
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navFP}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loadingLogin}
          >
            {loadingLogin ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>LOGIN</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={loadingGoogle}
          >
            {loadingGoogle ? (
              <ActivityIndicator
                size="small"
                color="#0D0140"
                style={styles.googleLoading}
              />
            ) : (
              <>
                <Image
                  source={require("./assets/G logo.png")}
                  style={styles.googleLogo}
                />
                <Text style={styles.googleButtonText}>SIGN IN WITH GOOGLE</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            You don't have a DYCIdocket account yet?{" "}
            <Text onPress={navSU} style={styles.signUpLink}>
              Sign Up
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
    marginTop: -10,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#0D0140",
    borderRadius: 3,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  rememberMeText: {
    fontFamily: "DMSans_400Regular",
    color: "#524B6B",
  },
  forgotPassword: {
    fontFamily: "DMSans_400Regular",
    color: "#524B6B",
  },
  loginButton: {
    backgroundColor: "#0D0140",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
  },
  orText: {
    fontFamily: "DMSans_400Regular",
    color: "#524B6B",
    marginVertical: 10,
    marginBottom: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    marginBottom: 52,
  },
  googleLoading: {
    marginRight: 10,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
  },
  signUpContainer: {
    position: "absolute",
    bottom: 47,
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
