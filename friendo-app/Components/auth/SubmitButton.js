import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";

const SubmitBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={{
        backgroundColor: "#e1eb34",
        height: 50,
        marginBottom: 20,
        marginHorizontal: 40,
        borderRadius: 24,
        justifyContent: "center",
      }}
    >
      <Text bold medium center>
        Submit
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitBtn;
