import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../Components/auth/UserInput";
import SubmitBtn from "../Components/auth/SubmitButton";
import axios from "axios";
import requestPermissions from "../Components/getCallMessages/getCall";
import { useNavigation } from "@react-navigation/native";
import ContactsList from "../Components/getContacts/getContacts";
import ProfileSetUp from "./ProfileSetUp";

const SignUp = () => {
  const navigation = useNavigation();

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const handleSubmit = async () => {
    if (username && email && password) {
      try {
        const response = await axios.post(
          "http://172.17.85.9:8000/signup/",
          {
            username,
            email,
            password,
          },
          {
            headers: { "Content-Type": "application/json" }, // Ensure JSON format
          }
        );

        // Check the backend response and handle accordingly
        if (response.data.success) {
          Alert.alert("Success", response.data.message);
          navigation.navigate("ProfileSetUp", {username, password, email});
        } else {
          Alert.alert("Failed!", response.data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to connect to server.");
      }
    } else {
      Alert.alert("Please fill all fields");
    }
  };

  // Listen for keyboard open/close events
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    requestPermissions(); // Request permissions when the app loads
  }, []);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { flexGrow: isKeyboardVisible ? 0 : 1 },
          ]}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text title center>
                Sign Up!
              </Text>

              <UserInput
                name="Name"
                value={username}
                setValue={setName}
                autoCapitalize="words"
              />
              <UserInput
                name="Email"
                value={email}
                setValue={setEmail}
                autoCompleteType="email"
                keyboardType="email-address"
              />
              <UserInput
                name="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
                keyboardType="password"
              />
              <SubmitBtn onPress={handleSubmit}></SubmitBtn>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Wrap everything in a full-screen View
  },
  scrollContainer: {
    padding: 20,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
