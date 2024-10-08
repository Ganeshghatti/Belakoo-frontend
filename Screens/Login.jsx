import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); // Initialize useNavigation

  const handleLogin = async () => {
    navigation.navigate("Campus");
    // try {
    //   // Replace with your API endpoint
    //   const response = await fetch("https://your-api-endpoint.com/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     // Navigate to Campus screen if login is successful
    //     navigation.navigate("Campus");
    //   } else {
    //     // Handle login errors (e.g., invalid credentials)
    //     Alert.alert("Login Error", data.message || "An error occurred during login.");
    //   }
    // } catch (error) {
    //   // Handle network errors
    //   Alert.alert("Network Error", "Unable to connect to the server. Please try again.");
    // }
  };

  return (
    <ImageBackground
      source={require("../assets/Login/bg.png")} // Replace with the path to your background image
      style={styles.background}
      resizeMode="cover"
    >
      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Main Login Form Container */}
      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>Welcome to Belakoo</Text>
        <Text style={styles.instructionsText}>
          Please login with your registered Email-ID & Password to continue
        </Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your Email ID"
          placeholderTextColor="#CCCCCC"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#CCCCCC"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        {/* Forgot Password Link */}
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 225,
    height: 120,
    resizeMode: "contain",
    marginBottom: 80,
    marginTop: 50,
  },
  loginContainer: {
    width: "90%", // Slightly adjusted to fit within the screen with padding
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: "#4E4949",
  },
  instructionsText: {
    marginBottom: 20,
    fontSize: 16,
    color: "#4E4949",
    fontWeight: "400",
    alignSelf: "stretch",
    fontStyle: "normal",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#4E4949",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#F56E00",
    paddingVertical: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default Login;
