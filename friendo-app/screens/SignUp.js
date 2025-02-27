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
} from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../Components/auth/UserInput";
import SubmitBtn from "../Components/auth/SubmitButton";
import axios from "axios";
import requestPermissions from "../Components/getCallMessages/getCall";
import { useNavigation } from '@react-navigation/native';
import ContactsList from "../Components/getContacts/getContacts";

const SignUp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const handleSubmit = () => {
    if (name && email && password) {
      // Navigate to the RequestPermissions screen
      navigation.navigate('ContactsList');
    } else {
      alert('Please fill all fields');
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
                value={name}
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
              <SubmitBtn onPress= {handleSubmit}></SubmitBtn>
              <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text>
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
