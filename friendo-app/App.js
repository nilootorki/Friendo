// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from './screens/SignUp';
import GetPermissions from './screens/permissions';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="GetPermissions" component={GetPermissions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import Welcome from "./Components/Welcome";
// import SignUp from "./screens/SignUp";
// import { WebView } from "react-native-webview";

// export default function App() {
//   return (
//     <>
//       <SignUp></SignUp>
//       {/* <WebView
//         style={styles.container}
//         source={{ uri: 'https://ems2.ut.ac.ir' }}
//       /> */}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
