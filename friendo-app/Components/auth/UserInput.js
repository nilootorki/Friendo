import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Text from "@kaloraat/react-native-text";

const UserInput = ({
  name,
  value,
  setValue,
  autoCapitalize = "none",
  autoCompleteType = "off",
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text>{name}</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        autoCompleteType={autoCompleteType}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={{
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

export default UserInput;
