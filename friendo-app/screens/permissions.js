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

const GetPermissions = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Request Permissions Demo</Text>
      <Button title="Request Permissions" onPress={requestPermissions} />
    </View>
  );
};



export default GetPermissions;