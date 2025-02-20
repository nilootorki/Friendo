import React from "react";
import { Text, View } from "react-native";

const Welcome = (props) => (
  <View>
    <Text>Hello {props.name}!</Text>
  </View>
);

export default Welcome;
