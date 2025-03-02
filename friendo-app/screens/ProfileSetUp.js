import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import SubmitBtn from "../Components/auth/SubmitButton";
import axios from "axios";
import requestPermissions from "../Components/getCallMessages/getCall";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const ProfileSetUp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, password, email } = route.params;

  const [personality, setPersonality] = useState("");
  const [mbti, setMbti] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const personalityTypes = ["Introvert", "Extrovert"];
  const mbtiTypes = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ];

  const handleSubmit = async () => {
    if (personality && mbti) {
      try {
        const response = await axios.post(
          "http://10.0.2.2:8000/profileSetup/",
          {
            username,
            password,
            email,
            personality,
            mbti,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          Alert.alert("Success", response.data.message);
          navigation.navigate("ContactsList", { username, password, email });
        } else {
          Alert.alert("Failed!", response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Error", "Failed to connect to server.");
      }
    } else {
      alert("Please select both personality type and MBTI.");
    }
  };

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
    requestPermissions();
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
            <View
              style={{ flex: 1, justifyContent: "center", marginBottom: 20 }}
            >
              <Text title center style={{ marginBottom: 40 }}>
                Personality Information:
              </Text>

              {/* Personality Selection */}
              <Text style={styles.question}>
                Are you an Introvert or Extrovert?
              </Text>
              <View style={styles.optionsContainer}>
                {personalityTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.button,
                      personality === type && styles.selectedButton,
                    ]}
                    onPress={() => setPersonality(type)}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        personality === type && styles.selectedText,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* MBTI Selection */}
              <Text style={styles.question}>
                Select your MBTI personality type:
              </Text>
              <View style={styles.mbtiContainer}>
                {mbtiTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.mbtiButton,
                      mbti === type && styles.selectedButton,
                    ]}
                    onPress={() => setMbti(type)}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        mbti === type && styles.selectedText,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Submit Button */}
              <SubmitBtn onPress={handleSubmit} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  mbtiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  mbtiButton: {
    backgroundColor: "#ddd",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    width: 70,
    alignItems: "center",
    marginBottom: 40,
  },
  selectedButton: {
    backgroundColor: "#6200ea",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  selectedText: {
    color: "#fff",
  },
});

export default ProfileSetUp;
